import { Object3D } from "./Object3D.js";
import {Matrix4} from "../math/Matrix4.js";

export class Mesh extends Object3D {
    /**
     * @param {Geometry} geometry
     * @param {Material} material
     */
    constructor(geometry, material) {
        super();
        this.geometry = geometry;
        this.material = material;
        this.modelMatrix = new Matrix4();
    }

    /**
     * Update the model matrix based on position, rotation, and scale
     */
    updateMatrix() {
        this.modelMatrix.identity();
        this.modelMatrix.translate(this.position.x, this.position.y, this.position.z);
        this.modelMatrix.rotateX(this.rotation.x);
        this.modelMatrix.rotateY(this.rotation.y);
        this.modelMatrix.rotateZ(this.rotation.z);
        this.modelMatrix.scale(this.scale.x, this.scale.y, this.scale.z);
    }
}