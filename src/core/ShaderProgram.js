export class ShaderProgram {
    /**
     * @param {WebGLRenderingContext} gl
     * @param {string} vertexSource - GLSL vertex shader source code
     * @param {string} fragmentSource - GLSL fragment shader source code
     */
    constructor(gl, vertexSource, fragmentSource) {
        this.gl = gl;
        this.program = this.createProgram(vertexSource, fragmentSource);
    }

    /**
     * Create and compile a shader
     * @param {string} source - GLSL shader source code
     * @param {number} type - Shader type (gl.VERTEX_SHADER or gl.FRAGMENT_SHADER)
     * @returns {WebGLShader}
     */
    createShader(source, type) {
        const shader = this.gl.createShader(type);
        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        const success = this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS);
        if (!success) {
            console.error(
                `Could not compile ${type === this.gl.VERTEX_SHADER ? 'vertex' : 'fragment'} shader:`,
                this.gl.getShaderInfoLog(shader)
            );
            this.gl.deleteShader(shader);
            return null;
        }

        return shader;
    }

    /**
     * Link vertex and fragment shaders into a shader program
     * @param {string} vertexSource
     * @param {string} fragmentSource
     * @returns {WebGLProgram}
     */
    createProgram(vertexSource, fragmentSource) {
        const vertexShader = this.createShader(vertexSource, this.gl.VERTEX_SHADER);
        const fragmentShader = this.createShader(fragmentSource, this.gl.FRAGMENT_SHADER);

        const program = this.gl.createProgram();
        this.gl.attachShader(program, vertexShader);
        this.gl.attachShader(program, fragmentShader);
        this.gl.linkProgram(program);

        const success = this.gl.getProgramParameter(program, this.gl.LINK_STATUS);
        if (!success) {
            console.error('Program failed to link:', this.gl.getProgramInfoLog(program));
            this.gl.deleteProgram(program);
            return null;
        } 

        return program;
    }

    /**
     * Use the shader program
     */
    use() {
        this.gl.useProgram(this.program);
    }

    /**
     * Get the location of an attribute
     * @param {string} name
     * @returns {number}
     */
    getAttribLocation(name) {
        return this.gl.getAttribLocation(this.program, name);
    }

    /**
     * Get the location of a uniform
     * @param {string} name
     * @returns {WebGLUniformLocation}
     */
    getUniformLocation(name) {
        return this.gl.getUniformLocation(this.program, name);
    }
}