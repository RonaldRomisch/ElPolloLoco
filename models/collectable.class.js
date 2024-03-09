class Collectable extends DrawableObject {

    height = 100;
    width = 100;

    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }

    IMAGE_COIN = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    IMAGE_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
    ];

    /**
     * 
     * @param {string} collectable - type of collectable
     * @param {*} x - position the collectable on the x-axis
     * @param {*} y - position the collectable on the y-axis
     */
    constructor(collectable, x, y) {
        super().loadImage(this.returnRightCollectable(collectable));
        this.loadImages(this.IMAGE_COIN);
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
    }

    /**
     * 
     * @param {string} collectable - type of collectable like coin or bottle
     * @returns array with the amount of collectable
     */
    returnRightCollectable(collectable) {
        if(collectable == 'coin') {
            return this.IMAGE_COIN[0];
        } else if(collectable == 'bottle') {
            return this.IMAGE_BOTTLE[0];
        }
    }
}