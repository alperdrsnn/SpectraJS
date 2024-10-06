import { Vector3 } from "../math/Vector3.js";
import { Matrix4 } from "../math/Matrix4.js";

export class Object3D {
    constructor() {
        this.position = new Vector3();
        this.rotation = new Vector3();
        this.scale = new Vector3(1, 1, 1);
        this.modelMatrix = new Matrix4();
        this.children = [];
        this.parent = null;
    }

    add(child) {
        if (child instanceof Object3D) {
            this.children.push(child);
            child.parent = this;
        } else {
            console.error('Child is not a instance of Object3D');
        }
    }

    remove(child) {
        const index = this.children.indexOf(child);
        if (index !== -1) {
            child.parent = null;
            this.children.splice(index, 1);
        }
    }

    updateMatrix() {
        this.modelMatrix.identity()
            .translate(this.position.x, this.position.y, this.position.z)
            .rotateX(this.rotation.x)
            .rotateY(this.rotation.y)
            .rotateZ(this.rotation.z)
            .scale(this.scale.x, this.scale.y, this.scale.z);
    }
}