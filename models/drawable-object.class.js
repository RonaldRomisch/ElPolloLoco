class DrawableObject {
    x = 120;
    y = 220;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;

    /**
     * loads the image for the object
     * 
     * @param {string} path - file path the image
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {

    }
    
    /**
     * Load all images for the object
     * 
     * @param {Array} arr - array with the images of the object
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        
    }
}