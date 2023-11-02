class MovableObject extends DrawableObject{
    
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    collectedCoins = 0;
    EARN_COIN_SOUND = new Audio('audio/coin/normal.mp3');
    
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
    // character.isColliding(chicken);
    /* isColliding (obj) {
        return  (this.X + this.width) >= obj.X && this.X <= (obj.X + obj.width) && 
            (this.Y + this.offsetY + this.height) >= obj.Y &&
            (this.Y + this.offsetY) <= (obj.Y + obj.height) && 
            obj.onCollisionCourse; // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
    } */

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y <mo.y + mo.height;
    }

    hit() {
        this.energy -= 10;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    earnCoin() {
        this.collectedCoins += 1;
        this.EARN_COIN_SOUND.play();
        console.log(this.collectedCoins);
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight () {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }
}