import { Matrix4 } from "../math/Matrix4.js";
import { Object3D } from "./Object3D.js";

export class Camera extends Object3D {
    constructor(fov = 60, ascept = 1.333, near = 0.1, far = 1000) {
        super();
        this.projectionMatrix = new Matrix4();
        this.viewMatrix = new Matrix4();
        this.fov = fov;
        this.ascept = ascept;
        this.near = near;
        this.far = far;
        this.updateProjectionMatrix();
        this.updateViewMatrix();
    }

    updateProjectionMatrix() {
        this.projectionMatrix.setPerspective(this.fov, this.ascept, this.near, this.far);
    }

    updateViewMatrix() {
        this.viewMatrix.identity()
            .rotateX(-this.rotation.x)
            .rotateY(-this.rotation.y)
            .rotateZ(-this.rotation.z)
            .translate(-this.position.x, -this.position.y, -this.position.z);
    }
}