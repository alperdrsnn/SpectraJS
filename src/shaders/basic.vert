attribute vec3 aPosition;
attribute vec2 aTexCoord;
attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTexCoord;
varying vec3 vNormal;
varying vec3 vFragPos;

void main() {
    vTexCoord = aTexCoord;
    vec4 fragPos = uModelMatrix * vec4(aPosition, 1.0);
    vFragPos = fragPos.xyz;
    vNormal = mat3(uModelMatrix) * aNormal;
    gl_Position = uProjectionMatrix * uViewMatrix * fragPos;
}