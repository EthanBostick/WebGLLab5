#version 300 es
precision mediump float;

in vec3 vPosition;
in vec3 vNormal;

uniform vec3 lightDirection;
uniform vec3 lightColor;
uniform vec3 ambientLight;

// Point light parameters
uniform vec3 pointLightPos1;
uniform vec3 pointLightCol1;
uniform vec3 pointLightPos2;
uniform vec3 pointLightCol2;
uniform bool usePointLights;

out vec4 fColor;

void main()
{
    vec3 N = normalize(vNormal);
    
    // Directional Light
    vec3 L_dir = normalize(lightDirection);
    float diff_dir = max(dot(N, L_dir), 0.0);
    vec3 diffuse = diff_dir * lightColor;

    // Point Lights
    if (usePointLights) {
        // Point Light 1
        vec3 L_point1 = pointLightPos1 - vPosition;
        float dist1 = length(L_point1);
        L_point1 = normalize(L_point1);
        float diff_point1 = max(dot(N, L_point1), 0.0) / (1.0 + 0.1 * dist1 * dist1);
        
        // Point Light 2
        vec3 L_point2 = pointLightPos2 - vPosition;
        float dist2 = length(L_point2);
        L_point2 = normalize(L_point2);
        float diff_point2 = max(dot(N, L_point2), 0.0) / (1.0 + 0.1 * dist2 * dist2);

        diffuse += (diff_point1 * pointLightCol1) + (diff_point2 * pointLightCol2);
    }

    vec3 finalColor = ambientLight + diffuse;
    fColor = vec4(finalColor, 1.0);
}