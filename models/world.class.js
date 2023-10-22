class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', -719, 400),
        new BackgroundObject('img/5_background/layers/3_third_layer/full.png', -719, 400),
        new BackgroundObject('img/5_background/layers/2_second_layer/full.png', -719, 140),
        new BackgroundObject('img/5_background/layers/1_first_layer/full.png', -719, 120),
        new BackgroundObject('img/5_background/layers/air.png', 0, 400),
        new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 0, 400),
        new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 0, 140),
        new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 0, 120),
        new BackgroundObject('img/5_background/layers/air.png', 719, 400),
        new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 719, 400),
        new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 719, 140),
        new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 719, 120),
        new BackgroundObject('img/5_background/layers/air.png', 719 * 2, 400),
        new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 719 * 2, 400),
        new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 719 * 2, 140),
        new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 719 * 2, 120)
    ];
    canvas;
    ctx;
    keyboard;
    camera_x = 0;


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

        this.ctx.translate(this.camera_x, 0); // Verschiebung der Kamera nach links

        this.addObjectsToMap(this.backgroundObjects);
        this.addToMap(this.character);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);

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
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height)
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
        }
    }
}