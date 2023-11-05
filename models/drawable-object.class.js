class DrawableObject {
    x = 120;
    y = 220;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currentImage = 0;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx) {
        
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Collectable) {
            ctx.beginPath();
            ctx.lineWidth = "2";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Collectable) {
            ctx.beginPath();
            ctx.lineWidth = "1";
            ctx.strokeStyle = "red";
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width + this.offset.right, this.height + this.offset.bottom);
            ctx.stroke();
        }
    }

    
    /**
     * 
     * @param {Array} arr - ['img/image1.png',...] 
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
        
    }
}