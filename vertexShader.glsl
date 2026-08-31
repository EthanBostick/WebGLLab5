#version 300 es

in vec4 aPosition;
in vec3 aNormal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

out vec3 vNormal;

void main() {
    gl_Position =
        uProjectionMatrix *
        uModelViewMatrix *
        aPosition;

    vNormal = aNormal;
}