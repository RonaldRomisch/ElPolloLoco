class BackgroundObject extends MovableObject {

    width = 720;
    height = 480;

    /**
     * 
     * @param {string} imagePath - path of the image file
     * @param {number} x - position on the x-axis
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }

}