import { Mesh } from "./Mesh.js";

export class Renderer {
    /**
     * @param {WebGLRenderingContext} gl
     */
    constructor(gl) {
        this.gl = gl;
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.currentShaderProgram = null;
    }

    /**
     * Render the scene from the perspective of the camera
     * @param {Scene} scene
     * @param {Camera} camera
     */
    render(scene, camera) {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        scene.lights.forEach(light => {
            this.setDirectionalLightUniform(light);
        });

        scene.children.forEach(object => {
            this.drawObject(object, camera);
        });
    }

    /**
     * Set directional light uniforms in the shader
     * @param {DirectionalLight} light
     */
    setDirectionalLightUniform(light) {
        const gl = this.gl;
        const shader = this.currentShaderProgram;

        if (!shader) return;

        // Set light direction
        const directionLoc = shader.getUniformLocation('uDirectionalLight.direction');
        if (directionLoc !== -1) {
            gl.uniform3fv(directionLoc, light.direction.toArray());
        }

        // Set light color
        const colorLoc = shader.getUniformLocation('uDirectionalLight.color');
        if (colorLoc !== -1) {
            gl.uniform3fv(colorLoc, light.color);
        }

        // Set light intensity
        const intensityLoc = shader.getUniformLocation('uDirectionalLight.intensity');
        if (intensityLoc !== -1) {
            gl.uniform1f(intensityLoc, light.intensity);
        }
    }

    /**
     * Draw a single object (Mesh) in the scene
     * @param {Mesh} object
     * @param {Camera} camera
     */
    drawObject(object, camera) {
        if (!(object instanceof Mesh)) return;

        const gl = this.gl;

        // Use the object's material (activates shader program and binds textures)
        object.material.use();

        // Update the current shader program tracker
        this.currentShaderProgram = object.material.shaderProgram;

        // Set transformation matrices
        const modelMatrixLocation = object.material.getUniformLocation('uModelMatrix');
        const viewMatrixLocation = object.material.getUniformLocation('uViewMatrix');
        const projectionMatrixLocation = object.material.getUniformLocation('uProjectionMatrix');

        if (modelMatrixLocation !== null) {
            gl.uniformMatrix4fv(modelMatrixLocation, false, object.modelMatrix.elements);
        }

        if (viewMatrixLocation !== null) {
            gl.uniformMatrix4fv(viewMatrixLocation, false, camera.viewMatrix.elements);
        }

        if (projectionMatrixLocation !== null) {
            gl.uniformMatrix4fv(projectionMatrixLocation, false, camera.projectionMatrix.elements);
        }

        // Position attribute
        const positionLocation = object.material.getAttribLocation('aPosition');
        if (positionLocation !== -1) {
            gl.enableVertexAttribArray(positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, object.geometry.vertexBuffer);
            gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
        }

        // UV attribute
        const uvLocation = object.material.getAttribLocation('aTexCoord');
        if (uvLocation !== -1) {
            gl.enableVertexAttribArray(uvLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, object.geometry.uvBuffer);
            gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0);
        }

        // Normal attribute
        const normalLocation = object.material.getAttribLocation('aNormal');
        if (normalLocation !== -1) {
            gl.enableVertexAttribArray(normalLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, object.geometry.normalBuffer);
            gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
        }

        // Bind the index buffer if it exists
        if (object.geometry.indexBuffer) {
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.geometry.indexBuffer);
            gl.drawElements(gl.TRIANGLES, object.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
        } else {
            gl.drawArrays(gl.TRIANGLES, 0, object.geometry.vertices.length / 3);
        }

        // Disable vertex attributes after drawing
        if (positionLocation !== -1) gl.disableVertexAttribArray(positionLocation);
        if (uvLocation !== -1) gl.disableVertexAttribArray(uvLocation);
        if (normalLocation !== -1) gl.disableVertexAttribArray(normalLocation);
    }
}