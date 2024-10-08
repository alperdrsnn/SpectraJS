import {Object3D} from "./Object3D.js";

export class Scene extends Object3D {
    constructor() {
        super();
        this.lights = [];
    }

    /**
     * Add a light to the scene
     * @param {DirectionalLight} light
     */
    addLight(light) {
        this.lights.push(light);
    }
}