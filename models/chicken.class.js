class Chicken extends MovableObject {
    y = 280;
    height = 100;
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 280 + Math.random() * 500;
    }
}