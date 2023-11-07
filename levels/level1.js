let level1 

initLevel();
function initLevel() {
    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],
        [
            new Cloud()
        ],
        [
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
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 719 * 2, 120),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3, 400),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 719 * 3, 400),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 719 * 3, 140),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 719 * 3, 120),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 4, 400),
            new BackgroundObject('img/5_background/layers/3_third_layer/full.png', 719 * 4, 400),
            new BackgroundObject('img/5_background/layers/2_second_layer/full.png', 719 * 4, 140),
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 719 * 4, 120)
        ],
        [
            new Collectable('coin', 300, 250),
            new Collectable('coin', 350, 250),
            new Collectable('coin', 400, 200),
            new Collectable('coin', 450, 50),
            new Collectable('coin', 500, 100),
            new Collectable('coin', 550, 50),
            new Collectable('coin', 600, 0),
            new Collectable('coin', 650, 50),
            new Collectable('coin', 700, 100),
            new Collectable('coin', -100, 50)
        ],
        [
            new Collectable('bottle', 800, 330),
            new Collectable('bottle', 1400, 335),
            new Collectable('bottle', -100, 340)
        ]
    );
}