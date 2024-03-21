/**
 * New object which can move
 */
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
    dead = false;
    gameStop = false;
    
    /**
     * objects which should fall, will get to the ground
     */
    applyGravity() {
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * 
     * @returns - true if the object is above the ground position
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) { //Throwable objects should always fall
            return true;
        }
        else if (this instanceof Endboss) { //Throwable objects should always fall
            return this.y < 0;
        } 
        else {
            return this.y < 130;
        }
    }

    /**
     * Function which handles collisions between objects
     * 
     * @param {Object} mo - object which collides with the function used on object
     * @returns true if two objects are colliding
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    isCollidingJump(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
     * Function reduces the 'health' of the object in form of the variable energy and stores the timing of the collision
     */
    hit() {
        this.energy -= 10;
        if(this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Returns the time how long the character is in the hurt condition
     * 
     * @returns true if the time of the last hit is les than 1 second ago
     */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit; // difference in ms
        return timePassed < 1000;
    }

    /**
     * 
     * @returns true if the energy is 0 of the object
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * 
     * @returns true if the energy is 0 of the endboss object
     */
    isDeadEndboss() {
        return this.healthEndboss == 0;
    }

    /**
     * Function reduces the 'health' of the endboss in form of the variable energy and stores the timing of the collision
     */
    hitEndboss() {
        this.healthEndboss -= 10;
        if(this.healthEndboss < 0) {
            this.healthEndboss = 0;
        } else {
            this.lastHitEndboss = new Date().getTime();
        }
    }

    /**
     * Plays the coin sound and increases the inventory by 1
     */
    earnCoin() {
        this.collectedCoins += 1;
        EARN_COIN_SOUND.play();
    }

    /**
     * Increases the bottle inventory by 1
     */
    fillThrowableObjectInventar() {
        if (this.throwableObjectsInventar > 5) {
            this.throwableObjectsInventar = 10;
        }
        else {
            this.throwableObjectsInventar += 5;
        }
    }

    /**
     * Animates the object with the images of the array
     * 
     * @param {Array} images - array of the images of the object
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Animates one image for the object
     * 
     * @param {Array} image - Array with only one image path of the object
     */
    playImage(image) {
        let path = image[0];
        this.img = this.imageCache[path];
    }

    /**
     * Object moves right with the speed of the object
     */
    moveRight () {
        this.x += this.speed;
    }

    /**
     * Object moves left with the speed of the object
     */
    moveLeft() {
        this.x -= this.speed;
    }
}