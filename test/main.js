import { Engine } from '../src/core/Engine.js';
import { Scene } from '../src/core/Scene.js';
import { Camera } from '../src/core/Camera.js';
import { Renderer } from '../src/core/Renderer.js';
import { Mesh } from '../src/core/Mesh.js';
import { ShaderProgram } from '../src/core/ShaderProgram.js';
import { BoxGeometry } from '../src/geometries/BoxGeometry.js';
import { Input } from '../src/core/Input.js';
import {TextureLoader} from "../src/core/TextureLoader.js";
import {Material} from "../src/core/Material.js";
import {DirectionalLight} from "../src/core/DirectionalLight.js";
import {Vector3} from "../src/math/Vector3.js";

const canvas = document.getElementById('glCanvas');
const engine = new Engine(canvas);
const gl = engine.gl;

const input = new Input(canvas);

const scene = new Scene();
const aspect = canvas.width / canvas.height;
const camera = new Camera(60, aspect, 0.1, 1000);
camera.position.z = 5;
camera.updateViewMatrix();

const renderer = new Renderer(gl);

const geometry = new BoxGeometry();
geometry.createBuffers(gl);

const vertexShaderSource = `
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
`;

const fragmentShaderSource = `
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

    // Ambient component
    vec3 ambient = 0.1 * uDirectionalLight.color;

    // Diffuse component
    vec3 norm = normalize(vNormal);
    vec3 lightDir = normalize(-uDirectionalLight.direction);
    float diff = max(dot(norm, lightDir), 0.0);
    vec3 diffuse = uDirectionalLight.intensity * diff * uDirectionalLight.color;

    // Combine components
    vec3 result = (ambient + diffuse) * texColor.rgb;

    gl_FragColor = vec4(result, texColor.a);
  }
`;

const textureLoader = new TextureLoader(gl);

const directionalLight = new DirectionalLight(
    new Vector3(-0.5, -1.0, -0.5).normalize(),
    [1.0, 1.0, 1.0],
    1.0
);
scene.addLight(directionalLight);

textureLoader.load('/test/images/texture.jpg').then((texture) => {
    const material = new Material(gl, vertexShaderSource, fragmentShaderSource, texture);

    const cube = new Mesh(geometry, material);
    scene.add(cube);

    function animate() {
        requestAnimationFrame(animate);

        const moveSpeed = 0.1;
        if (input.isKeyPressed('KeyW')) camera.position.z -= moveSpeed;
        if (input.isKeyPressed('KeyS')) camera.position.z += moveSpeed;
        if (input.isKeyPressed('KeyA')) camera.position.x -= moveSpeed;
        if (input.isKeyPressed('KeyD')) camera.position.x += moveSpeed;

        camera.updateViewMatrix();

        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.updateMatrix();

        renderer.render(scene, camera);
    }

    animate();
}).catch((error) => {
    console.error('Texture error:', error);
});