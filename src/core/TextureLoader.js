export class TextureLoader {
    constructor(gl) {
        this.gl = gl;
        this.textures = {};
    }

    load(url) {
        return new Promise((resolve, reject) => {
            if (this.textures[url]) {
                resolve(this.textures[url]);
                return;
            }

            const image = new Image();
            image.onload = () => {
                const texture = this.gl.createTexture();
                this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

                // Invert Y axis when loading texture
                this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

                this.gl.texImage2D(
                    this.gl.TEXTURE_2D,
                    0,
                    this.gl.RGBA,
                    this.gl.RGBA,
                    this.gl.UNSIGNED_BYTE,
                    image
                );

                this.gl.generateMipmap(this.gl.TEXTURE_2D);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.REPEAT);
                this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.REPEAT);

                this.textures[url] = texture;
                resolve(texture);
            };

            image.onerror = () => {
                reject(new Error(`Texture could not be loaded: ${url}`));
            };

            image.src = url;
        });
    }
}