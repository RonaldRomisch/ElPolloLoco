class ThrowableObject extends MovableObject {
    endbossWasHit = false;
    enemyWasHit = false;

    ROTATION_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    BREAKING_IMAGES = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.ROTATION_IMAGES);
        this.loadImages(this.BREAKING_IMAGES);
        this.x = x;
        this.y = y;
        this.height = 110;
        this.width = 120;
        this.throw();
    }

    /**
     * function which throws the bottle
     */
    throw() {
        this.speedY = 20;
        this.applyGravity();
        
        setInterval(() => {
            if (!this.enemyWasHit) {
                this.x += 10;
            }
            
        }, 25);
        setInterval(() => {
            if (!this.enemyWasHit) {
                this.playAnimation(this.ROTATION_IMAGES);
            }
            else {
                this.playAnimation(this.BREAKING_IMAGES);
            }
        }, 125);
    }
    
    offset = {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
    }
}