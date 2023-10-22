let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My character is', world.character);
}

document.addEventListener("keypress", (e) => {
    console.log(e);
});