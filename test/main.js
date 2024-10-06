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

const canvas = document.getElementById('glCanvas');
const engine = new Engine(canvas);
const gl = engine.gl;

const input = new Input(canvas);

const scene = new Scene();
const aspect = canvas.width / canvas.clientHeight;
const camera = new Camera(60, aspect, 0.1, 1000);
camera.position.z = 5;
camera.updateViewMatrix();

const renderer = new Renderer(gl);

const geometry = new BoxGeometry();
geometry.createBuffers(gl);

const vertexShaderSource = `
  attribute vec3 aPosition;
  attribute vec2 aTexCoord;

  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying vec2 vTexCoord;

  void main() {
    vTexCoord = aTexCoord;
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  uniform sampler2D uTexture;
  varying vec2 vTexCoord;

  void main() {
    gl_FragColor = texture2D(uTexture, vTexCoord);
  }
`;

const textureLoader = new TextureLoader(gl);

textureLoader.load('/test/images/texture.jpg').then((texture) => {
    const material = new Material(gl, vertexShaderSource, fragmentShaderSource, texture);

    const cube = new Mesh(geometry, material);
    scene.add(cube);

    function animate() {
        requestAnimationFrame(animate);

        const moveSpeed = 0.1;
        if (input.isKeyPressed('KeyW')) {
            camera.position.z -= moveSpeed;
        }
        if (input.isKeyPressed('KeyS')) {
            camera.position.z += moveSpeed;
        }
        if (input.isKeyPressed('KeyA')) {
            camera.position.x -= moveSpeed;
        }
        if (input.isKeyPressed('KeyD')) {
            camera.position.x += moveSpeed;
        }

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