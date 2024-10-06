export class Engine {

    constructor(canvas) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!this.gl) {
            console.error('WEBGL not supported!');
            return;
        }

        this.init();
    }

    init() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    }

    start() {
        this.update();
    }

    update() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        requestAnimationFrame(this.update.bind())
    }
}