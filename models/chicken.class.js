class Chicken extends MovableObject {
    y = 350;
    height = 80;

    intervalChickenIds = [];

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    away = [''];
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.loadImages(this.away);

        this.x = 480 + Math.random() * 1500;
        this.speed = 0.15 + Math.random() * 1;

        this.animate();
    }
    
    /**
     * Animation function for the enemy chicken
     */
    animate() {
        /**
         * Movement interval
         */
        setInterval(() => {
            if (!this.dead) {
                this.moveLeft();
            }
        }, 1000 / 60);
        
        /**
         * Interval for animation and sound for hurt or dead chicken
         */
        let intervalChicken = setInterval(() => {
            if(this.dead == true) {
                this.playImage(this.IMAGE_DEAD);
                setTimeout(() => {
                    this.playImage(this.away);
                    window.clearInterval(intervalChicken);
                    this.y = 1000;
                }, 1000);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
            this.intervalChickenIds.push(intervalChicken);
        }, 300);
        
    }
    
}