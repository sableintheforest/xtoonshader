#version 330 core

out vec4 FragColor;

in vec3 normal;
in vec2 texCoord;
in vec3 fragPos;

uniform sampler2D texture_toon;
uniform vec3 cameraPos;
uniform vec3 lightPos;

uniform int shaderType;
uniform float weightTexture;

void main()
{    
	vec3 lightColor = vec3(1.0, 1.0, 1.0);
	vec3 nnormal = normalize(normal);
	vec3 lightDir = normalize(lightPos - fragPos);
	float zMin = 0.5f;
	float zMax = 3.5f;
	float zValue = fragPos.z;
	float f1 = max(dot(nnormal, lightDir), 0.005);
	float f2 = 1.0 - log(zValue / zMin) / log (zMax / zMin);
	vec4 xToonColor = texture(texture_toon, vec2(f1, f2));
	vec3 result = lightColor * xToonColor.rgb;
	FragColor = vec4(result, 1.0);
}