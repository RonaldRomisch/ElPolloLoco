class StatusBar extends DrawableObject {
    
    showStatusBarEndboss = false;

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

    IMAGES_ENDBOSS = [
        'img/7_statusbars/2_statusbar_endboss/blue.png',
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/orange.png'
    ];

    percentage = 100;
    percentageEndboss = 100;
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
        } else if (input == 'endboss') {
            this.healthEndbossStatusBar();
        }
    }

    /**
     * Initializes the Health statusbar with full health
     */
    healthStatusBar() {
        this.loadImages(this.IMAGES_HEALTH);
        this.setPercentage(100);
        this.x = 40;
        this.y = -10;
    }

    /**
     * Update the statusbar with the current health
     * 
     * @param {number} percentage - current health
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndexHealth()];
        this.img = this.imageCache[path];
    }

    /**
     * Updates the image of the health statusbar
     * 
     * @returns - position of the Images array
     */
    resolveImageIndexHealth() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        }else if (this.percentage > 60) {
            return 3;
        }else if (this.percentage > 30) {
            return 2;
        }else if (this.percentage > 0) {
            return 1;
        }else {
            return 0;
        }
    }

    /**
     * Intitializes bottle statusbar
     */
    throwStatusBar() {
        this.loadImages(this.IMAGES_THROW_OBJECTS);
        this.setThrowObjects(0);
        this.x = 20;
        this.y = 30;
    }

    /**
     * Updates number of bottles in the inventory
     * 
     * @param {number} numberThrowObjects - number of bottles in the inventory
     */
    setThrowObjects(numberThrowObjects) {
        this.numberThrowObjects = numberThrowObjects;
        let path = this.IMAGES_THROW_OBJECTS[this.resolveImageIndexThrowObjects()];
        this.img = this.imageCache[path];
    }

    /**
     * Updates images of bottle statusbar
     * 
     * @returns position of the array of the bottle images
     */
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

    /**
     * Initializes coin statusbar
     */
    coinStatusBar() {
        this.loadImages(this.IMAGES_COINS);
        this.setCollectedCoins(0);
        this.x = 0;
        this.y = 70;
    }

    /**
     * Updates coin status bar
     * 
     * @param {number} coinsCollectedStatusBar - number of coins collected
     */
    setCollectedCoins(coinsCollectedStatusBar) {
        this.coinsCollectedStatusBar = coinsCollectedStatusBar;
        let path = this.IMAGES_COINS[this.resolveImageIndexCoins()];
        this.img = this.imageCache[path];
    }

    /**
     * Updates images of coin statusbar
     * 
     * @returns position of images array
     */
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

    /**
     * Initializes the Health statusbar of the endboss with full health
     */
    healthEndbossStatusBar() {
        this.loadImages(this.IMAGES_ENDBOSS);
        this.setPercentageEndboss(100);
        this.x = 310;
        this.y = 410;
    }

    /**
     * Update the statusbar with the current health of the endboss
     * 
     * @param {number} percentage - current health of endboss
     */
    setPercentageEndboss(percentageEndboss) {
        this.percentageEndboss = percentageEndboss;
        let path = this.IMAGES_ENDBOSS[this.resolveImageIndexHealthEndboss()];
        this.img = this.imageCache[path];
    }

    /**
     * Updates the image of the health statusbar of the endboss
     * 
     * @returns - position of the Images array
     */
    resolveImageIndexHealthEndboss() {
        if (this.percentageEndboss == 100) {
            return 0;
        } else if (this.percentageEndboss > 50) {
            return 1;
        }else {
            return 2;
        }
    }
}