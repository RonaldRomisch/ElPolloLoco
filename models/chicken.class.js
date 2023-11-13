class Chicken extends MovableObject {
    y = 350;
    height = 80;

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
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);

        this.x = 480 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 1;

        this.animate();
    }
    
    animate() {
        setInterval(() => {
            /* this.moveLeft(); */
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 300);

        if(this.isDeadChicken){
            setTimeout(() => {
                this.playImage(this.IMAGE_DEAD);
            }, 1000);
        }
    }
}