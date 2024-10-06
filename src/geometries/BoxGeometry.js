import { Geometry } from "../core/Geometry.js";

export class BoxGeometry extends Geometry {
    constructor(width = 1, height = 1, depth = 1) {
        super();

        const w = width / 2;
        const h = height / 2;
        const d = depth / 2;

        this.vertices = [
            // Front Side
            -w, -h,  d,
             w, -h,  d,
             w,  h,  d,
            -w,  h,  d,
            // Back Side
            -w, -h, -d,
            -w,  h, -d,
             w,  h, -d,
             w, -h, -d,
            // Top Side
            -w,  h, -d,
            -w,  h,  d,
             w,  h,  d,
             w,  h, -d,
            // Bottom Side
            -w, -h, -d,
             w, -h, -d,
             w, -h,  d,
            -w, -h,  d,
            // Left Side
             w, -h, -d,
             w,  h, -d,
             w,  h,  d,
             w, -h,  d,
            // Right Side
            -w, -h, -d,
            -w, -h,  d,
            -w,  h,  d,
            -w,  h, -d,
          ];

        this.indices = [
            0,  1,  2,   2,  3,  0,    // Front Side
            4,  5,  6,   6,  7,  4,    // Back Side
            8,  9, 10,  10, 11,  8,    // Top Side
            12, 13, 14, 14, 15, 12,    // Bottom Side
            16, 17, 18, 18, 19, 16,    // Left Side
            20, 21, 22, 22, 23, 20     // Right Side
        ];

        this.uvs = [
            // Front Side
            0, 0, 1, 0, 1, 1, 0, 1,
            // Back Side
            0, 0, 1, 0, 1, 1, 0, 1,
            // Top Side
            0, 0, 1, 0, 1, 1, 0, 1,
            // Bottom Side
            0, 0, 1, 0, 1, 1, 0, 1,
            // Left Side
            0, 0, 1, 0, 1, 1, 0, 1,
            // Right Side
            0, 0, 1, 0, 1, 1, 0, 1,
        ];

        this.createUVBuffer = function (gl) {
            this.uvBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.uvs), gl.STATIC_DRAW);
        };

        this.createBuffers = function (gl) {
            this.vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
            gl.bufferData(
                gl.ARRAY_BUFFER,
                new Float32Array(this.vertices),
                gl.STATIC_DRAW
            );

            if (this.indices.length > 0) {
                this.indexBuffer = gl.createBuffer();
                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
                gl.bufferData(
                    gl.ELEMENT_ARRAY_BUFFER,
                    new Uint16Array(this.indices),
                    gl.STATIC_DRAW
                );
            }

            this.createUVBuffer(gl);
        }
    }
}