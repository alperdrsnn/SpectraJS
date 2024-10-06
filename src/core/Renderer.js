import { Mesh } from "./Mesh.js";

export class Renderer {
    constructor(gl) {
        this.gl = gl;
    }

    render(scene, camera) {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        scene.children.forEach(object => {
            this.drawObject(object, camera);
        });
    }

    drawObject(object, camera) {
        if (object instanceof Mesh) {
            const gl = this.gl;

            object.material.use();

            const modelMatrixLocation = object.material.getUniformLocation('uModelMatrix');
            const viewMatrixLocation = object.material.getUniformLocation('uViewMatrix');
            const projectionMatrixLocation = object.material.getUniformLocation('uProjectionMatrix');

            gl.uniformMatrix4fv(modelMatrixLocation, false, object.modelMatrix.elements);
            gl.uniformMatrix4fv(viewMatrixLocation, false, camera.viewMatrix.elements);
            gl.uniformMatrix4fv(projectionMatrixLocation, false, camera.projectionMatrix.elements);

            const positionLocation = object.material.getAttribLocation('aPosition');
            gl.enableVertexAttribArray(positionLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, object.geometry.vertexBuffer);
            gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

            if (object.geometry.indexBuffer) {
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, object.geometry.indexBuffer);
                gl.drawElements(gl.TRIANGLES, object.geometry.indices.length, gl.UNSIGNED_SHORT, 0);
            } else {
                gl.drawArrays(gl.TRIANGLES, 0, object.geometry.vertices.length / 3);
            }

            gl.disableVertexAttribArray(positionLocation);
        }

        //object.updateMatrix();

        object.children.forEach(child => {
            this.drawObject(child, camera);
        });
    }
}