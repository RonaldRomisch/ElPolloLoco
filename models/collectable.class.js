class Collectable extends DrawableObject {


    offset = {
        top: 35,
        bottom: -70,
        left: 35,
        right: -70
    }

    IMAGE_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    IMAGE_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    constructor(collectable, x, y) {
        super().loadImage(this.returnRightCollectable(collectable));
        this.loadImages(this.IMAGE_COIN);
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
    }

    returnRightCollectable(collectable) {
        if(collectable == 'coin') {
            return this.IMAGE_COIN[0];
        } else if(collectable == 'bottle') {
            return this.IMAGE_BOTTLE[0];
        }
    }
}