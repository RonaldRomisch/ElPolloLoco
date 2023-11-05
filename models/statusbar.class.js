class StatusBar extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ]; 

    IMAGES_THROW_OBJECTS = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ]; 

    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ]; 

    percentage = 100;
    numberThrowObjects = 0;
    coinsCollectedStatusBar = 0;

    constructor(input) {
        super();
        this.width = 200;
        this.height = 70;
        if ('health' == input) {
            this.healthStatusBar();
        } else if (input == 'throw-objects') {
            this.throwStatusBar();
        } else if (input == 'coins') {
            this.coinStatusBar();
        }
    }

    healthStatusBar() {
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
        this.x = 40;
        this.y = -10;
    }

    throwStatusBar() {
        this.loadImages(this.IMAGES_THROW_OBJECTS);
        this.setThrowObjects(0);
        this.x = 20;
        this.y = 30;
    }

    coinStatusBar() {
        this.loadImages(this.IMAGES_COINS);
        this.setCollectedCoins(0);
        this.x = 0;
        this.y = 70;
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }

    setThrowObjects(numberThrowObjects) {
        this.numberThrowObjects = numberThrowObjects;
        let path = this.IMAGES_THROW_OBJECTS[this.resolveImageIndexThrowObjects()];
        this.img = this.imageCache[path];
    }

    setCollectedCoins(coinsCollectedStatusBar) {
        this.coinsCollectedStatusBar = coinsCollectedStatusBar;
        let path = this.IMAGES_COINS[this.resolveImageIndexCoins()];
        this.img = this.imageCache[path];
    }

    resolveImageIndexHealth() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        }else if (this.percentage > 60) {
            return 3;
        }else if (this.percentage > 40) {
            return 2;
        }else if (this.percentage > 20) {
            return 1;
        }else {
            return 0;
        }
    }

    resolveImageIndexThrowObjects() {
        if (this.numberThrowObjects >= 10) {
            return 5;
        } else if (this.numberThrowObjects > 7) {
            return 4;
        }else if (this.numberThrowObjects > 5) {
            return 3;
        }else if (this.numberThrowObjects > 2) {
            return 2;
        }else if (this.numberThrowObjects > 0) {
            return 1;
        }else {
            return 0;
        }
    }

    resolveImageIndexCoins() {
        if (this.coinsCollectedStatusBar == 10) {
            return 5;
        } else if (this.coinsCollectedStatusBar > 6) {
            return 4;
        }else if (this.coinsCollectedStatusBar > 4) {
            return 3;
        }else if (this.coinsCollectedStatusBar > 2) {
            return 2;
        }else if (this.coinsCollectedStatusBar > 0) {
            return 1;
        }else {
            return 0;
        }
    }
}