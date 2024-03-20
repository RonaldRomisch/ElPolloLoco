class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusBar('health');
    statusBarThrowObject = new StatusBar('throw-objects');
    statusBarCollectedCoins = new StatusBar('coins');
    statusBarEndbossHealth = new StatusBar('endboss');
    throwableObjects = [];
    gameStartTime = 0;
    endScreenX;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.muteAndUnmuteAllSounds();
        this.restartLevelParts();
    }

    /**
     * With initializing the world object the level object activates all objects which it contains
     */
    restartLevelParts() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            this.level.enemies[i].animate();
        }
        this.level.endboss[0].animate();
        this.level.endboss[0].dead = false;
        initLevel();
    }

    /**
     * Mutes and unmutes all sounds
     */
    muteAndUnmuteAllSounds() {
        if (!soundOn) {
            for (let i = 0; i < sounds_Array.length; i++) {
                sounds_Array[i].muted = true;
            }
        }
        else {
            for (let i = 0; i < sounds_Array.length; i++) {
                sounds_Array[i].muted = false;
            }
        }
    }

    /**
     * Sets the world
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Run function sets an interval with all functions which are running throughout the game
     */
    run() {
        setInterval(() => {
            this.checkEndbossCollisions();
            this.checkthrowableObjectCollision();
            this.checkCoinCollision();
            this.checkBottleCollisions();
            this.checkEnemyCollisionsJump();
            this.addSmallChickenToWorld();
            this.addCloudsToWorld();
            this.timeFromBeginning();
            this.updateXForEndscreen();
        }, 25);
        setInterval(() => {
            this.checkThrowObjects();
        }, 150);
        setInterval(() => {
            this.checkEnemyCollisions();
            background_sound.play();
        }, 350);
    }

    /**
     * Counter with the start of the game
     */
    timeFromBeginning() {
        this.gameStartTime += 25;
    }

    /**
     * With the movement of the character the x positions changes, so it will be udated
     */
    updateXForEndscreen() {
        this.endScreenX = this.character.x - 50;
    }

    /**
     * The thrown bottle will be animated and the inventory will be updated
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.character.throwableObjectsInventar > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.character.throwableObjectsInventar -= 1;
            this.statusBarThrowObject.setThrowObjects(this.character.throwableObjectsInventar);
            this.character.resetDurationOfStanding();
        }
    }

    /**
     * A small chicken will be added to the game after every 8 seconds
     */
    addSmallChickenToWorld() {
        if (this.gameStartTime > 10000) {
            this.level.enemies.push(new SmallChicken());
            this.gameStartTime -= 8000;
        }
    }

    /**
     * Clouds will be added to the game all 8 seconds
     */
    addCloudsToWorld() {
        if (this.gameStartTime > 10000) {
            this.level.clouds.push(new Cloud(6100));
            this.gameStartTime -= 8000;
        }
    }

    /**
     * The collisions with enemies with the condition of the character being above ground and over the enemy are being checked
     */
    checkEnemyCollisionsJump() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && enemy['dead'] == false) {
                    this.character.jump();
                    enemy['dead'] = true;
                }
            }
        });
    }

    /**
     * Collisions with enemies are being checked
     */
    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                if (!this.character.isAboveGround() && enemy['dead'] == false) {
                    this.characterIsGettingHit();
                } 
            }
        });
    }

    /**
     * Collisions with the endboss are being checked
     */
    checkEndbossCollisions() {
        if(this.character.isColliding(this.level.endboss[0])) {
            this.characterIsGettingHit();
        }
    }

    /**
     * If the character is being hit with updating the health and the statusbar
     */
    characterIsGettingHit() {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
    }

    /**
     * Checks collisions of the bottle with enemies and updates all aspects
     */
    checkthrowableObjectCollision() {
        for (let j = 0; j < this.throwableObjects.length; j++) {
            for (let i =  0; i < this.level.enemies.length; i++) {
                if (this.level.enemies[i].isColliding(this.throwableObjects[j])) {
                    this.level.enemies[i]['dead'] = true;
                    this.throwableObjects[j].enemyWasHit = true;
                    bottle_sound.play();
                }
                if (this.level.endboss[0].isColliding(this.throwableObjects[j]) && this.throwableObjects[j].endbossWasHit == false) {
                    this.level.endboss[0].hitEndboss();
                    this.statusBarEndbossHealth.setPercentageEndboss(this.level.endboss[0].healthEndboss);
                    this.throwableObjects[j].endbossWasHit = true;
                    this.throwableObjects[j].enemyWasHit = true;
                    cry_sound.play();
                    bottle_sound.play();
                }
            }
        }
    }

    /**
     * Checks collsions of the character with coins, removes collided the coin and updates the inventory
     */
    checkCoinCollision() {
        for (let i = 0; i < this.level.coins.length; i++) {
            if (this.character.isColliding(this.level.coins[i])) {
                this.character.earnCoin();
                this.statusBarCollectedCoins.setCollectedCoins(this.character.collectedCoins);
                this.removeObjectFromScreen(this.level.coins, i)
            }
        }
    }

    /**
     * Checks the bottle collision of the character with the bottle which can be collected
     */
    checkBottleCollisions() {
        for (let i = 0; i < this.level.bottles.length; i++) {
            if (this.character.isColliding(this.level.bottles[i])) {
                this.character.fillThrowableObjectInventar();
                this.statusBarThrowObject.setThrowObjects(this.character.throwableObjectsInventar);
                this.removeObjectFromScreen(this.level.bottles, i);
            }
        }
    }

    /**
     * Removes the object from the game
     * 
     * @param {Array} objectArray - array of the removed object
     * @param {number} indexFromObjectArray - position of the removed object in the array
     */
    removeObjectFromScreen(objectArray, indexFromObjectArray) {
        objectArray.splice(indexFromObjectArray, 1);
    }

    /**
     * Function which puts the objects into the canvas and updates itself
     */
    draw() {
        this.drawBackgroundAndClouds();
        this.drawStatusBars();
        this.drawEndbossStatusBar();
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addToMap(this.character);
        this.drawEnemies();
        this.ctx.translate(-this.camera_x, 0);
        this.drawEndscreen();
        let self = this;
        requestAnimationFrame(function() {
            self.draw();//the word "this" is not known in the function requestAnimationFrame
        });
    }

    /**
     * Draws all statusbars except for endboss
     */
    drawStatusBars() {
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusBarHealth);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusBarThrowObject);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusBarCollectedCoins);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Draws all enemies
     */
    drawEnemies() {
        this.addToMap(this.level.endboss[0]);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
     * Draws Background and the clouds
     */
    drawBackgroundAndClouds() {
        this.ctx.translate(this.camera_x, 0); // Verschiebung der Kamera nach links
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * draws Endboss statusbar if the character gets to a certain point on the x-axis
     */
    drawEndbossStatusBar() {
        if (this.character.showStatusBarEndboss) {
            this.ctx.translate(-this.camera_x, 0); 
            this.addToMap(this.statusBarEndbossHealth);
            this.ctx.translate(this.camera_x, 0);
        }
    }

    /**
     * Draws endscreen which depends if the character or the endboss dies
     */
    drawEndscreen() {
        if (this.level.endboss[0].dead) {
            this.addToMap(new BackgroundObject('img/9_intro_outro_screens/game_over/game over.png', 0));
        }
        if (this.character.dead) {
            this.addToMap(new BackgroundObject('img/9_intro_outro_screens/game_over/oh no you lost!.png', 0));
        }
    }

    /**
     * Adds all objects of an array to the world
     * 
     * @param {Array} objects - Array with all objects which are added
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Adds an object to the game
     * 
     * @param {object} mo - Object which will be added to the world
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Mirrors the image of the object on the y-axis
     * 
     * @param {object} mo - object which should be mirrored
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Mirrors the object back to the original image
     * 
     * @param {object} mo - object which image gets restored
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}