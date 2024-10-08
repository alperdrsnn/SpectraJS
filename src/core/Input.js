export class Input {
    constructor(canvas) {
        this.canvas = canvas;
        this.keys = {};
        this.mouse = {
            x: 0,
            y: 0,
            buttons: {}
        };
        this.initEventListeners();
    }

    initEventListeners() {
        window.addEventListener('keydown', (event) => {
            this.keys[event.code] = true;
        });

        window.addEventListener('keyup', (event) => {
            this.keys[event.code] = false;
        });

        this.canvas.addEventListener('mousemove', (event) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = event.clientX - rect.left;
            this.mouse.y = event.clientY - rect.top;
        });

        this.canvas.addEventListener('mousedown', (event) => {
            this.mouse.buttons[event.button] = true;
        });;

        this.canvas.addEventListener('mouseup', (event) => {
            this.mouse.buttons[event.button] = false;
        });
    }

    isKeyPressed(keyCode) {
        return !!this.keys[keyCode];
    }

    isMouseButtonPressed(button) {
        return !!this.mouse.buttons[button];
    }
}