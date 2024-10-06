import { ShaderProgram } from './ShaderProgram.js';

export class Material {
    constructor(gl, vertexSource, fragmentSource, texture = null) {
        this.gl = gl;
        this.shaderProgram = new ShaderProgram(gl, vertexSource, fragmentSource);
        this.texture = texture;
    }

    use() {
        this.shaderProgram.use();
        if (this.texture) {
            const textureLocation = this.shaderProgram.getUniformLocation('uTexture');
            if (textureLocation !== -1) {
                this.gl.activeTexture(this.gl.TEXTURE0);
                this.gl.bindTexture(this.gl.TEXTURE_2D, this.texture);
                this.gl.uniform1i(textureLocation, 0);
            }
        }
    }

    getAttribLocation(name) {
        return this.shaderProgram.getAttribLocation(name);
    }

    getUniformLocation(name) {
        return this.shaderProgram.getUniformLocation(name);
    }
}
