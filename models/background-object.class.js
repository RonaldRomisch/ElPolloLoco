class BackgroundObject extends MovableObject {

    width = 720;
    height = 420;

    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 420 - this.height;
    }
}