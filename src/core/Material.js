import { ShaderProgram } from './ShaderProgram.js';

export class Material {
    /**
     * @param {WebGLRenderingContext} gl
     * @param {string} vertexSource
     * @param {string} fragmentSource
     * @param {WebGLTexture} texture
     */
    constructor(gl, vertexSource, fragmentSource, texture = null) {
        this.gl = gl;
        this.shaderProgram = new ShaderProgram(gl, vertexSource, fragmentSource);
        this.texture = texture;
    }

    /**
     * Activate the material (use shader and bind textures)
     */
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

    /**
     * Get attribute location from the shader program
     * @param {string} name
     * @returns {number}
     */
    getAttribLocation(name) {
        return this.shaderProgram.getAttribLocation(name);
    }

    /**
     * Get uniform location from the shader program
     * @param {string} name
     * @returns {WebGLUniformLocation}
     */
    getUniformLocation(name) {
        return this.shaderProgram.getUniformLocation(name);
    }
}
