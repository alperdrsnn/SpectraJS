export class Geometry {
    constructor() {
        this.vertices = [];
        this.indices = [];
        this.vertexBuffer = null;
        this.indexBuffer = null;
    }

    createBuffers(gl) {
        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array(this.vertices),
            gl.STATIC_DRAW
        );

        if (this.indices.length > 0) {
            this.indexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
            gl.bufferData(
                gl.ELEMENT_ARRAY_BUFFER,
                new Uint16Array(this.indices),
                gl.STATIC_DRAW
            );
        }
    }
}