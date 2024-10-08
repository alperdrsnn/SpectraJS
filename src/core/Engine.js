export class Engine {
    /**
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.gl = this.initWebGL();
        if (!this.gl) {
            alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        }
    }

    /**
     * Initialize WebGL context
     * @returns {WebGLRenderingContext}
     */
    initWebGL() {
        return this.canvas.getContext('webgl') || this.canvas.getContext('experimental-webgl');
    }
}