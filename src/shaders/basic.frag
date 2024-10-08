precision mediump float;

struct DirectionalLight {
    vec3 direction;
    vec3 color;
    float intensity;
};

uniform sampler2D uTexture;
uniform DirectionalLight uDirectionalLight;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vFragPos;

void main() {
    vec4 texColor = texture2D(uTexture, vTexCoord);

    vec3 ambient = 0.1 * uDirectionalLight.color;

    vec3 norm = normalize(vNormal);
    vec3 lightDir = normalize(-uDirectionalLight.direction);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = uDirectionalLight.intensity * diff * uDirectionalLight.color;

    vec3 result = (ambient + diffuse) * texColor.rgb;

    gl_FragColor = vec4(result, texColor.a);
}