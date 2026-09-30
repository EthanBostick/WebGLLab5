#version 300 es

precision mediump float;

in vec3 vNormal;

uniform vec3 lightDirection;
uniform vec3 lightColor;
uniform vec3 ambientLight;

out vec4 fColor;

void main()
{
    vec3 N = normalize(vNormal);

    float diffuse = max(dot(N, normalize(lightDirection)), 0.0);

    vec3 color = ambientLight + diffuse * lightColor;

    fColor = vec4(color, 1.0);
}