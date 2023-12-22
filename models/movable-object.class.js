class MovableObject extends DrawableObject{
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    healthEndboss = 100;
    lastHitEndboss = 0;
    collectedCoins = 0;
    throwableObjectsInventar = 0;
    EARN_COIN_SOUND = new Audio('audio/coin/normal.mp3');
    dead = false;
    
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable objects should always fall
            return true
        } else {
            return this.y < 130;
        }
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000;
        console.log(timePassed, this.energy);
        return timePassed < 4;
    }

    isDead() {
        return this.energy == 0;
    }

    hitEndboss() {
        this.healthEndboss -= 10;
        if(this.healthEndboss < 0) {
            this.healthEndboss = 0;
        } else {
            this.lastHitEndboss = new Date().getTime();
        }
    }

    endbossIsHurt() {
        let timePassed = new Date().getTime() - this.lastHitEndboss; // difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 9;
    }

    earnCoin() {
        this.collectedCoins += 1;
        this.EARN_COIN_SOUND.play();
    }

    fillThrowableObjectInventar() {
        this.throwableObjectsInventar = 10;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    playImage(image) {
        let path = image[0];
        this.img = this.imageCache[path];
    }

    moveRight () {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}