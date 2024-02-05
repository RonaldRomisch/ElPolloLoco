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
    background_sound = new Audio('audio/background/Sakura-Girl-Daisy-chosic.com_.mp3');
    endboss_sound = new Audio('audio/enemies/albundyx-mexican-turkey-106743.mp3');
    cry_sound = new Audio('audio/enemies/albundyx-mexican-turkey-106743.mp3');
    bottle_sound = new Audio('audio/bottle/bottle_sound.mp3');
    sounds_Array = [
        this.background_sound,
        this.endboss_sound,
        this.cry_sound,
        this.bottle_sound,
        this.character.walking_sound,
        this.character.snoring_sound,
        this.character.jumping_sound,
        this.character.hurt_sound
    ];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.background_sound.volume = 0.08;
    }

    muteAndUnmuteAllSounds() {
        if (!soundOn) {
            for (let i = 0; i < this.sounds_Array.length; i++) {
                this.sounds_Array[i].muted = true;
            }
        }
        else {
            for (let i = 0; i < this.sounds_Array.length; i++) {
                this.sounds_Array[i].muted = false;
            }
        }
    }

    setWorld() {
        this.character.world = this;
    }

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
            this.background_sound.play();
        }, 350);
    }

    timeFromBeginning() {
        this.gameStartTime += 25;
    }

    updateXForEndscreen() {
        this.endScreenX = this.character.x - 50;
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.throwableObjectsInventar > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.character.throwableObjectsInventar -= 1;
            this.statusBarThrowObject.setThrowObjects(this.character.throwableObjectsInventar);
            this.character.resetDurationOfStanding();
            console.log(this.throwableObjects);
        }
    }

    addSmallChickenToWorld() {
        if (this.gameStartTime > 10000) {
            this.level.enemies.push(new SmallChicken());
            this.gameStartTime -= 8000;
        }
    }

    addCloudsToWorld() {
        if (this.gameStartTime > 10000) {
            this.level.clouds.push(new Cloud(6100));
            this.gameStartTime -= 8000;
        }
    }

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

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                if (!this.character.isAboveGround() && enemy['dead'] == false) {
                    this.characterIsGettingHit();
                } 
            }
        });
    }

    checkEndbossCollisions() {
        if(this.character.isColliding(this.level.endboss[0])) {
            this.characterIsGettingHit();
        }
    }

    characterIsGettingHit() {
        this.character.hit();
        this.statusBarHealth.setPercentage(this.character.energy);
    }

    checkthrowableObjectCollision() {
        for (let j = 0; j < this.throwableObjects.length; j++) {
            for (let i =  0; i < this.level.enemies.length; i++) {
                if (this.level.enemies[i].isColliding(this.throwableObjects[j])) {
                    this.level.enemies[i]['dead'] = true;
                    this.throwableObjects[j].enemyWasHit = true;
                    this.bottle_sound.play();
                }
                if (this.level.endboss[0].isColliding(this.throwableObjects[j]) && this.throwableObjects[j].endbossWasHit == false) {
                    this.level.endboss[0].hitEndboss();
                    this.statusBarEndbossHealth.setPercentageEndboss(this.level.endboss[0].healthEndboss);
                    console.log(this.level.endboss[0].healthEndboss, this.throwableObjects[j].endbossWasHit);
                    this.throwableObjects[j].endbossWasHit = true;
                    this.throwableObjects[j].enemyWasHit = true;
                    this.cry_sound.play();
                    this.bottle_sound.play();
                }
            }
        }
    }

    checkCoinCollision() {
        for (let i = 0; i < this.level.coins.length; i++) {
            if (this.character.isColliding(this.level.coins[i])) {
                this.character.earnCoin();
                this.statusBarCollectedCoins.setCollectedCoins(this.character.collectedCoins);
                this.removeObjectFromScreen(this.level.coins, i)
            }
        }
    }

    checkBottleCollisions() {
        for (let i = 0; i < this.level.bottles.length; i++) {
            if (this.character.isColliding(this.level.bottles[i])) {
                this.character.fillThrowableObjectInventar();
                this.statusBarThrowObject.setThrowObjects(this.character.throwableObjectsInventar);
                this.removeObjectFromScreen(this.level.bottles, i);
            }
        }
    }

    removeObjectFromScreen(objectArray, indexFromObjectArray) {
        objectArray.splice(indexFromObjectArray, 1);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0); // Verschiebung der Kamera nach links
        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        
        this.ctx.translate(-this.camera_x, 0); 
        // -------- Space for fixed object
        this.addToMap(this.statusBarHealth);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusBarThrowObject);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0); 
        this.addToMap(this.statusBarCollectedCoins);
        this.ctx.translate(this.camera_x, 0);

        if (this.character.showStatusBarEndboss) {
            this.ctx.translate(-this.camera_x, 0); 
            this.addToMap(this.statusBarEndbossHealth);
            this.ctx.translate(this.camera_x, 0);
        }
        
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.addToMap(this.character);
        this.addToMap(this.level.endboss[0]);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

        if (this.character.dead || this.level.endboss[0].dead) {
            this.addToMap(new BackgroundObject('img/9_intro_outro_screens/game_over/game over.png', 0));
        }

        //draw() wird immer wieder aufgerufen
        let self = this;
        requestAnimationFrame(function() {
            self.draw();//the word "this" is not known in the function requestAnimationFrame
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}