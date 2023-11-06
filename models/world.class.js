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
            this.checkCollisions();
            this.checkThrowObjects();
        }, 100);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.character.throwableObjectsInventar > 0) {
            let bottle = new ThrowableObject(this.character.x, this.character.y);
            this.throwableObjects.push(bottle);
            this.character.throwableObjectsInventar -= 1;
            this.statusBarThrowObject.setThrowObjects(this.character.throwableObjectsInventar);
            console.log(this.character.throwableObjectsInventar);
        }
    }

    checkCollisions() {
        //damage
        this.level.enemies.forEach((enemy) => {
            if(this.character.isColliding(enemy)) {
                console.log(true, 'enemy');
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            };
        })
        //Collect coins
        for (let i = 0; i < this.level.coins.length; i++) {
            if (this.character.isColliding(this.level.coins[i])) {
                this.character.earnCoin();
                this.statusBarCollectedCoins.setCollectedCoins(this.character.collectedCoins);
                this.level.coins.splice(i, 1);
            }
        }
        //Collect bottles
        for (let i = 0; i < this.level.bottles.length; i++) {
            if (this.character.isColliding(this.level.bottles[i])) {
                console.log(true, 'bottle');
                this.character.fillThrowableObjectInventar();
                this.statusBarThrowObject.setThrowObjects(this.character.throwableObjectsInventar);
                this.level.bottles.splice(i, 1);
            }
        }
        /* this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.character.earnCoin();
                this.statusBarCollectedCoins.setCollectedCoins(this.character.collectedCoins);
                this.level.coins.splice(coin, 1);
            }
        }); */
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