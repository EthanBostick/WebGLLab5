#version 300 es
in vec4 aPosition;
in vec3 aNormal;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

out vec3 vPosition;
out vec3 vNormal;

void main()
{
    vec4 eyePos = uModelViewMatrix * aPosition;
    vPosition = eyePos.xyz;
    vNormal = mat3(uModelViewMatrix) * aNormal;
    gl_Position = uProjectionMatrix * eyePos;
}