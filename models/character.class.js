class Character extends MovableObject{
    
    y = -45;
    x = 50;

    showStatusBarEndboss = false;

    height = 300;
    width = 150;
    speed = 15;

    durationOfStanding = 0;

    /* offset = {
        top: 130,
        bottom: -45,
        left: 40,
        right: -35
    } */

    offset = {
        top: 120,
        bottom: 10,
        left: 40,
        right: 40
    }
    
    // Uncaught DOMException: Failed to execute 'drawImage' on 'CanvasRenderingContext2D': The HTMLImageElement provided is in the 'broken' state.
    // the error came from false image source: 'img/2_character_pepe/2_walk7/W-23.png'
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_STANDING = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_SLEEPING = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    world;
    walking_sound = new Audio('audio/character/walking.mp3');
    snoring_sound = new Audio('audio/character/snoring.mp3');
    jumping_sound = new Audio('audio/character/jump.mp3');
    hurt_sound = new Audio('audio/character/hurt.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_STANDING);
        this.loadImages(this.IMAGES_SLEEPING);
        this.applyGravity();
        this.jumping_sound.volume = 0.1;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.walking_sound.pause();
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (soundOn && !this.isAboveGround()) {
                    this.walking_sound.play();
                }
                else {
                    this.walking_sound.pause();
                }
            }
            if (this.world.keyboard.LEFT && this.x > -500) {
                this.moveLeft();
                this.otherDirection = true;
                if (soundOn && !this.isAboveGround()) {
                    this.walking_sound.play();
                }
                else {
                    this.walking_sound.pause();
                }
            }
            //Jump function
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }
            if(this.x > 2340) {
                this.showStatusBarEndboss = true;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                setTimeout(() => {
                    this.dead = true;
                    this.stopGame();
                }, 600);
            } else if(this.isHurt()) {
                setTimeout(this.playAnimation(this.IMAGES_HURT), 1000);
                this.resetDurationOfStanding();
                if (soundOn) {
                    this.hurt_sound.play();
                }
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING)
                this.resetDurationOfStanding();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT){
                // walk animation
                this.playAnimation(this.IMAGES_WALKING);
                this.resetDurationOfStanding();
            } 
            else {
                
                this.durationOfStanding += 100;
                if (this.durationOfStanding > 4000) {
                    this.playAnimation(this.IMAGES_SLEEPING);
                    if (soundOn) {
                        this.snoring_sound.play();
                    }
                    else if (this.snoring_sound.play() !== undefined){
                        this.snoring_sound.pause();
                    }
                }
                else {
                    this.playAnimation(this.IMAGES_STANDING);
                    if (this.snoring_sound.play() !== undefined){
                        this.snoring_sound.pause();
                    }
                }
            }
        }, 100);   
    }

    resetDurationOfStanding() {
        this.durationOfStanding = 0;
    }

    jump() {
        this.speedY = 23;
        if (soundOn) {
            this.jumping_sound.play();
            this.snoring_sound.pause();
        }
        else {
            this.jumping_sound.pause();
        }
    }
}