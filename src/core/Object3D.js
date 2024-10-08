import { Vector3 } from "../math/Vector3.js";
import { Matrix4 } from "../math/Matrix4.js";

export class Object3D {
    constructor() {
        this.position = new Vector3();
        this.rotation = new Vector3();
        this.scale = new Vector3(1, 1, 1);
        this.modelMatrix = new Matrix4();
        this.children = [];
    }

    /**
     * Add a child object
     * @param {Object3D} child
     */
    add(child) {
        this.children.push(child);
    }

    /**
     * Update the transformation matrix based on position, rotation, and scale
     */
    updateMatrix() {
        this.modelMatrix.identity();
        this.modelMatrix.translate(this.position.x, this.position.y, this.position.z);
        this.modelMatrix.rotateX(this.rotation.x);
        this.modelMatrix.rotateY(this.rotation.y);
        this.modelMatrix.rotateZ(this.rotation.z);
        this.modelMatrix.scale(this.scale.x, this.scale.y, this.scale.z);

        // Update children matrices if any
        this.children.forEach(child => {
            child.updateMatrix();
        });
    }
}