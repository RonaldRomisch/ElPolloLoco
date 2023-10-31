class Collectables extends DrawableObject {


    IMAGE_COIN = [
        'img/8_coin/coin_1.png'
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGE_COIN);
        this.x = 100;
        this.y = 100;
        this.width = 50;
        this.height = 50;
    }
}