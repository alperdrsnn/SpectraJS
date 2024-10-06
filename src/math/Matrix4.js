export class Matrix4 {
    constructor() {
        this.elements = new Float32Array(16);
        this.identity();
    }

    identity() {
        const e = this.elements;
        e[0] = 1; e[4] = 0; e[8] = 0;   e[12] = 0;
        e[1] = 0; e[5] = 1; e[9] = 0;   e[13] = 0;
        e[2] = 0; e[6] = 0; e[10] = 1;  e[14] = 0;
        e[3] = 0; e[7] = 0; e[11] = 0;  e[15] = 1;

        return this;
    }

    multiply(matrix) {
        const a = this.elements;
        const b = matrix.elements;
        const result = new Float32Array(16);

        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                result[col + row * 4] = 
                    a[row * 4] * b[col] +
                    a[row * 4 + 1] * b[col + 4] +
                    a[row * 4 + 2] * b[col + 8] +
                    a[row * 4 + 3] * b[col + 12];
            }
        }

        this.elements = result;
        return this;
    }

    translate(x, y, z) {
        const e = this.elements;
        e[12] += x;
        e[13] += y;
        e[14] += z;

        return this;
    }

    rotateX(angle) {
        const e = this.elements;
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        const m1 = e[4], m2 = e[5], m3 = e[6], m4 = e[7];
        const m5 = e[8], m6 = e[9], m7 = e[10], m8 = e[11];

        e[4] = m1 * c + m5 * s;
        e[5] = m2 * c + m6 * s;
        e[6] = m3 * c + m7 * s;
        e[7] = m4 * c + m8 * s;
        e[8] = m5 * c - m1 * s;
        e[9] = m6 * c - m2 * s;
        e[10] = m7 * c - m3 * s;
        e[11] = m8 * c - m4 * s;

        return this;
    }

    rotateY(angle) {
        const e = this.elements;
        const c = Math.cos(angle);
        const s = Math.sin(angle);
    
        const m1 = e[0], m2 = e[1], m3 = e[2], m4 = e[3];
        const m5 = e[8], m6 = e[9], m7 = e[10], m8 = e[11];
    
        e[0] = m1 * c - m5 * s;
        e[1] = m2 * c - m6 * s;
        e[2] = m3 * c - m7 * s;
        e[3] = m4 * c - m8 * s;
        e[8] = m1 * s + m5 * c;
        e[9] = m2 * s + m6 * c;
        e[10] = m3 * s + m7 * c;
        e[11] = m4 * s + m8 * c;
    
        return this;
    }
    
    rotateZ(angle) {
        const e = this.elements;
        const c = Math.cos(angle);
        const s = Math.sin(angle);

        const m1 = e[0], m2 = e[1], m3 = e[2], m4 = e[3];
        const m5 = e[4], m6 = e[5], m7 = e[6], m8 = e[7];

        e[0] = m1 * c + m5 * s;
        e[1] = m2 * c + m6 * s;
        e[2] = m3 * c + m7 * s;
        e[3] = m4 * c + m8 * s;
        e[4] = m5 * c - m1 * s;
        e[5] = m6 * c - m2 * s;
        e[6] = m7 * c - m3 * s;
        e[7] = m8 * c - m4 * s;

        return this;
    }

    scale(x, y, z) {
        const e = this.elements;
        e[0] *= x; e[4] *= y; e[8]  *= z;
        e[1] *= x; e[5] *= y; e[9]  *= z;
        e[2] *= x; e[6] *= y; e[10] *= z;
        e[3] *= x; e[7] *= y; e[11] *= z;
        return this;
    }

    setPerspective(fov, aspect, near, far) {
        const e = this.elements;
        const f = 1.0 / Math.tan((fov / 2) * (Math.PI / 180));
        const nf = 1 / (near - far);
    
        e[0] = f / aspect;
        e[1] = 0;
        e[2] = 0;
        e[3] = 0;
    
        e[4] = 0;
        e[5] = f;
        e[6] = 0;
        e[7] = 0;
    
        e[8] = 0;
        e[9] = 0;
        e[10] = (far + near) * nf;
        e[11] = -1;
    
        e[12] = 0;
        e[13] = 0;
        e[14] = (2 * far * near) * nf;
        e[15] = 0;
    
        return this;
    }
}