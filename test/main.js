import { Engine } from '../src/core/Engine.js';
import { Scene } from '../src/core/Scene.js';
import { Camera } from '../src/core/Camera.js';
import { Renderer } from '../src/core/Renderer.js';
import { Mesh } from '../src/core/Mesh.js';
import { ShaderProgram } from '../src/core/ShaderProgram.js';
import { BoxGeometry } from '../src/geometries/BoxGeometry.js';
import { Input } from '../src/core/Input.js';

const canvas = document.getElementById('glCanvas');
const engine = new Engine(canvas);
const gl = engine.gl;

const input = new Input(canvas);

const scene = new Scene();
const ascept = canvas.width / canvas.clientHeight;
const camera = new Camera(60, ascept, 0.1, 1000);
camera.position.z = 5;
camera.updateViewMatrix();

const renderer = new Renderer(gl);

const geometry = new BoxGeometry();
geometry.createBuffers(gl);

const vertexShaderSource = `
  attribute vec3 aPosition;
  uniform mat4 uModelMatrix;
  uniform mat4 uViewMatrix;
  uniform mat4 uProjectionMatrix;

  void main() {
    gl_Position = uProjectionMatrix * uViewMatrix * uModelMatrix * vec4(aPosition, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;

  void main() {
    gl_FragColor = vec4(0.6, 0.6, 0.6, 1.0);
  }
`;

const shaderProgram = new ShaderProgram(gl, vertexShaderSource, fragmentShaderSource);

const cube = new Mesh(geometry, shaderProgram);
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