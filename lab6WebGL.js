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

let pointLightPos1Loc;
let pointLightCol1Loc;
let pointLightPos2Loc;
let pointLightCol2Loc;
let usePointLightsLoc;

// Mode selector for screenshots:
// 1=Red, 2=Green, 3=Blue, 4=Purple, 5=Disco, 6=Directional, 7=Ambient, 8=PointLights
let currentMode = '5';

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

    pointsArray.push(vertices[a]); normalsArray.push(normal);
    pointsArray.push(vertices[b]); normalsArray.push(normal);
    pointsArray.push(vertices[c]); normalsArray.push(normal);
    pointsArray.push(vertices[a]); normalsArray.push(normal);
    pointsArray.push(vertices[c]); normalsArray.push(normal);
    pointsArray.push(vertices[d]); normalsArray.push(normal);
}

function colorCube()
{
    quad(1, 0, 3, 2);
    quad(2, 3, 7, 6);
    quad(3, 0, 4, 7);
    quad(6, 5, 1, 2);
    quad(4, 5, 6, 7);
    quad(5, 4, 0, 1);
}

window.onload = async function()
{
    const canvas = document.getElementById("gl-canvas");
    gl = canvas.getContext("webgl2");

    if(!gl) {
        alert("WebGL 2.0 isn't available");
        return;
    }

    window.addEventListener("keydown", (e) => {
        if(['1','2','3','4','5','6','7','8'].includes(e.key)) {
            currentMode = e.key;
        }
    });

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    colorCube();

    const vertexSource = await fetch("vertexShader6.glsl").then(r => r.text());
    const fragmentSource = await fetch("fragmentShader6.glsl").then(r => r.text());

    program = createProgram(gl, vertexSource, fragmentSource);
    gl.useProgram(program);

    const vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pointsArray), gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "aPosition");
    gl.vertexAttribPointer(positionLoc, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(positionLoc);

    const nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(normalsArray), gl.STATIC_DRAW);

    const normalLoc = gl.getAttribLocation(program, "aNormal");
    gl.vertexAttribPointer(normalLoc, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(normalLoc);

    modelViewLoc = gl.getUniformLocation(program, "uModelViewMatrix");
    projectionLoc = gl.getUniformLocation(program, "uProjectionMatrix");
    lightDirectionLoc = gl.getUniformLocation(program, "lightDirection");
    lightColorLoc = gl.getUniformLocation(program, "lightColor");
    ambientLightLoc = gl.getUniformLocation(program, "ambientLight");

    pointLightPos1Loc = gl.getUniformLocation(program, "pointLightPos1");
    pointLightCol1Loc = gl.getUniformLocation(program, "pointLightCol1");
    pointLightPos2Loc = gl.getUniformLocation(program, "pointLightPos2");
    pointLightCol2Loc = gl.getUniformLocation(program, "pointLightCol2");
    usePointLightsLoc = gl.getUniformLocation(program, "usePointLights");

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

    let lDir = vec3(1.0, 1.0, 1.0);
    let lCol = vec3(1.0, 1.0, 1.0);
    let amb = vec3(0.2, 0.2, 0.2);
    let usePointLights = false;

    if (currentMode === '1') {
        lCol = vec3(1.0, 0.0, 0.0);
    } else if (currentMode === '2') {
        lCol = vec3(0.0, 1.0, 0.0);
    } else if (currentMode === '3') {
        lCol = vec3(0.0, 0.0, 1.0);
    } else if (currentMode === '4') {
        lCol = vec3(1.0, 0.0, 1.0); // Purple / Magenta
    } else if (currentMode === '5') {
        // Disco Cube mode
        lDir = vec3(Math.cos(theta * 0.02), 1.0, Math.sin(theta * 0.02));
        lCol = vec3(
            Math.abs(Math.sin(theta * 0.02)),
            Math.abs(Math.sin(theta * 0.03)),
            Math.abs(Math.sin(theta * 0.04))
        );
    } else if (currentMode === '6') {
        lDir = vec3(1.0, 0.0, 0.0);
        lCol = vec3(1.0, 1.0, 1.0);
    } else if (currentMode === '7') {
        amb = vec3(0.6, 0.6, 0.6);
    } else if (currentMode === '8') {
        // Point lights active
        usePointLights = true;
        lCol = vec3(0.0, 0.0, 0.0); // disable directional to view point lights clearly
        gl.uniform3fv(pointLightPos1Loc, flatten(vec3(1.5 * Math.cos(theta * 0.03), 0.5, -3.0 + 1.5 * Math.sin(theta * 0.03))));
        gl.uniform3fv(pointLightCol1Loc, flatten(vec3(1.0, 0.2, 0.2))); // Red point light
        gl.uniform3fv(pointLightPos2Loc, flatten(vec3(0.0, 1.5, -3.0)));
        gl.uniform3fv(pointLightCol2Loc, flatten(vec3(0.2, 0.4, 1.0))); // Blue point light
    }

    gl.uniform3fv(lightDirectionLoc, flatten(lDir));
    gl.uniform3fv(lightColorLoc, flatten(lCol));
    gl.uniform3fv(ambientLightLoc, flatten(amb));
    gl.uniform1i(usePointLightsLoc, usePointLights ? 1 : 0);

    gl.drawArrays(gl.TRIANGLES, 0, 36);

    requestAnimationFrame(render);
}

function createShader(gl, type, source)
{
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
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
    if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error(gl.getProgramInfoLog(program));
        return null;
    }
    return program;
}