class Endboss extends MovableObject {

    height = 450;
    width = 250;
    y = -100;
    isAlerted = false;
    isWalking = false;

    offset = {
        top: 90,
        bottom: -100,
        left: 10,
        right: -20
    }
    
    IMAGES_ALERTED = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_ALERTED[0]);
        this.loadImages(this.IMAGES_ALERTED);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.x = 2900;
        this.animate();
    }


    /**
     * animates the endboss with sound, movement and endsequence
     */
    animate() {

        setInterval(() => {
            if (this.isDeadEndboss()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.isAlerted = false;
                setTimeout(() => {
                    this.healthEndboss = 100;
                    this.dead = true;
                    stopGame();
                    if (soundOn) {
                        muteSounds();
                    }
                }, 2000);
            } 
            else if (this.isWalking) {
                this.playAnimation(this.IMAGES_WALKING);
            }
            else if (this.healthEndboss < 50) {
                this.playAnimation(this.IMAGES_HURT);
                this.endbossMoveLeft();
                this.isAlerted = true;
            }
            else {
                this.playAnimation(this.IMAGES_ALERTED);
            }
        }, 200);

        setInterval(() => {
            if (this.isAlerted) {
                this.jumpSequence();
            }
        }, 3000);
    }

    /**
     * Endboss moves left
     */
    endbossMoveLeft() {
        this.x -= 20;
    }

    /**
     * Jump height for the endboss
     */
    jumpSequence() {
        this.speedY = 20;
    }
}