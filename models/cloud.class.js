class Cloud extends MovableObject {
    
    height = 250;
    width = 500;

    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * x;
        this.animate();
        this.y = 10 + 20 * Math.random();
        this.speed = 0.15 + Math.random() * 1;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 50);
        
    }
}