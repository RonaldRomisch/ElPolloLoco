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


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkEnemyCollisions();
            this.checkthrowableObjectCollision();
            this.checkCoinCollision();
            this.checkBottleCollisions();
        }, 25);
        setInterval(() => {
            this.checkThrowObjects();
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.throwableObjectsInventar > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.character.throwableObjectsInventar -= 1;
            this.statusBarThrowObject.setThrowObjects(this.character.throwableObjectsInventar);
            console.log(this.throwableObjects);
        }
    }

    checkEnemyCollisions() {
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                if (this.character.isAboveGround() && !(enemy instanceof Endboss)) {
                    this.character.jump();
                    setTimeout(console.log('wtf'), 100);
                } else {
                    this.character.hit();
                    this.statusBarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }

    checkthrowableObjectCollision() {
        for (let i = 0; i < this.level.enemies.length; i++) {
            for (let j = 0; j < this.throwableObjects.length; j++) {
                if (this.level.enemies[i].isColliding(this.throwableObjects[j]) && !(this.level.enemies[i] instanceof Endboss)) {
                    this.level.enemies[i]['dead'] = true;
                    setTimeout(() => {
                        this.removeObjectFromScreen(this.level.enemies, i);
                    }, 2000);
                }
                if (this.level.enemies[i].isColliding(this.throwableObjects[j]) && this.level.enemies[i] instanceof Endboss) {
                    this.level.enemies[i].hitEndboss();
                    this.statusBarEndbossHealth.setPercentageEndboss(this.level.enemies[i].healthEndboss);
                    console.log(this.level.enemies[i].healthEndboss);
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0); // Verschiebung der Kamera nach links
        this.addObjectsToMap(this.level.backgroundObjects);
        
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

        if (this.character.x > 2340) {
            this.ctx.translate(-this.camera_x, 0); 
            this.addToMap(this.statusBarEndbossHealth);
            this.ctx.translate(this.camera_x, 0);
        }
        
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0);

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