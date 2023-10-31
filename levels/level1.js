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
            new BackgroundObject('img/5_background/layers/1_first_layer/full.png', 719 * 2, 120)
        ]
    );
}
