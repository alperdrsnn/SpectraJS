import {Vector3} from "../math/Vector3.js";

export class DirectionalLight {
    /**
     * @param {Vector3} direction - The direction the light is coming from
     * @param {Array} color - RGB color array [r, g, b], values between 0 and 1
     * @param {number} intensity - Intensity of the light
     */
    constructor(direction = new Vector3(0, -1, 0), color = [1.0, 1.0, 1.0], intensity = 1.0) {
        this.direction = direction.normalize();
        this.color = color;
        this.intensity = intensity;
    }
}