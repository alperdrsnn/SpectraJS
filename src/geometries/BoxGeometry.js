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
    }
}