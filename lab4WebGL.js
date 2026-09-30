"use strict";

let gl;
let program;

let pointsArray = [];
let normalsArray = [];

let theta = 0;

let modelViewLoc;
let projectionLoc;
let lightDirectionLoc;
let lightColorLoc;
let ambientLightLoc;

// Screenshot state tracker
let currentMode = '5'; // 1=Red, 2=Green, 3=Blue, 4=Animated, 5=Disco

// Cube vertices
const vertices = [
    vec4(-0.5, -0.5,  0.5, 1.0),
    vec4(-0.5,  0.5,  0.5, 1.0),
    vec4( 0.5,  0.5,  0.5, 1.0),
    vec4( 0.5, -0.5,  0.5, 1.0),

    vec4(-0.5, -0.5, -0.5, 1.0),
    vec4(-0.5,  0.5, -0.5, 1.0),
    vec4( 0.5,  0.5, -0.5, 1.0),
    vec4( 0.5, -0.5, -0.5, 1.0)
];

function quad(a, b, c, d)
{
    let t1 = subtract(vertices[b], vertices[a]);
    let t2 = subtract(vertices[c], vertices[b]);

    let normal = normalize(cross(t1, t2));

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);

    pointsArray.push(vertices[b]);
    normalsArray.push(normal);

    pointsArray.push(vertices[c]);
    normalsArray.push(normal);

    pointsArray.push(vertices[a]);
    normalsArray.push(normal);

    pointsArray.push(vertices[c]);
    normalsArray.push(normal);

    pointsArray.push(vertices[d]);
    normalsArray.push(normal);
}

function colorCube()
{
    quad(1, 0, 3, 2); // front
    quad(2, 3, 7, 6); // right
    quad(3, 0, 4, 7); // bottom
    quad(6, 5, 1, 2); // top
    quad(4, 5, 6, 7); // back
    quad(5, 4, 0, 1); // left
}

window.onload = async function()
{
    const canvas = document.getElementById("gl-canvas");

    gl = canvas.getContext("webgl2");

    if(!gl)
    {
        alert("WebGL 2.0 isn't available");
        return;
    }

    // Keyboard listener for screenshots
    window.addEventListener("keydown", (e) => {
        if(['1','2','3','4','5'].includes(e.key)) {
            currentMode = e.key;
        }
    });

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    colorCube();

    const vertexSource = await fetch("vertexShader.glsl").then(r => r.text());
    const fragmentSource = await fetch("fragmentShader.glsl").then(r => r.text());

    program = createProgram(gl, vertexSource, fragmentSource);
    gl.useProgram(program);

    // Position Buffer
    const vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    // Normal Buffer
    const nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    const normalLoc = gl.getAttribLocation(program, "aNormal");
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normalLoc);

    // Uniform mapping
    modelViewLoc = gl.getUniformLocation(program, "uModelViewMatrix");
    projectionLoc = gl.getUniformLocation(program, "uProjectionMatrix");
    lightDirectionLoc = gl.getUniformLocation(program, "lightDirection");
    lightColorLoc = gl.getUniformLocation(program, "lightColor");
    ambientLightLoc = gl.getUniformLocation(program, "ambientLight");

    render();
};

function render()
{
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    theta += 1.0;

    let modelView = mult(translate(0.0, 0.0, -3.0), rotateY(theta));
    let projection = perspective(45.0, 1.0, 0.1, 100.0);

    gl.uniformMatrix4fv(modelViewLoc, false, flatten(modelView));
    gl.uniformMatrix4fv(projectionLoc, false, flatten(projection));

    // Base lighting parameters
    let lDir = vec3(1.0, 1.0, 1.0);
    let lCol = vec3(1.0, 1.0, 1.0);
    let amb = vec3(0.2, 0.2, 0.2);

    // State machine for screenshot captures
    if (currentMode === '1') {
        lCol = vec3(1.0, 0.0, 0.0);
    } 
    else if (currentMode === '2') {
        lCol = vec3(0.0, 1.0, 0.0);
    } 
    else if (currentMode === '3') {
        lCol = vec3(0.0, 0.0, 1.0);
    } 
    else if (currentMode === '4') {
        lDir = vec3(Math.cos(theta * 0.02), 1.0, Math.sin(theta * 0.02));
    } 
    else if (currentMode === '5') {
        lDir = vec3(Math.cos(theta * 0.02), 1.0, Math.sin(theta * 0.02));
        lCol = vec3(
            Math.abs(Math.sin(theta * 0.02)),
            Math.abs(Math.sin(theta * 0.03)),
            Math.abs(Math.sin(theta * 0.04))
        );
    }

    gl.uniform3fv(lightDirectionLoc, flatten(lDir));
    gl.uniform3fv(lightColorLoc, flatten(lCol));
    gl.uniform3fv(ambientLightLoc, flatten(amb));

    gl.drawArrays(gl.TRIANGLES, 0, 36);

    requestAnimationFrame(render);
}

function createShader(gl, type, source)
{
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    {
        console.error(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function createProgram(gl, vsSource, fsSource)
{
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if(!gl.getProgramParameter(program, gl.LINK_STATUS))
    {
        console.error(gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}