let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function getHTMLCanvas() {
    document.getElementById('start-screen').innerHTML = `
        <canvas id="canvas" width="720" height="480"></canvas>
    `;
}

function gameOverScreen() {
    document.getElementById('start-screen').innerHTML += `
        <div class="game-over-screen">
            <div>Game Over!</div>
            <div>You Loser!</div>
        </div>
    `;
}

function init() {
    getHTMLCanvas();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My character is', world.character);
}

document.addEventListener("keydown", (e) => {
    if (e.keyCode == '39') {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == '40') {
        keyboard.DOWN = true;
    }
    if (e.keyCode == '37') {
        keyboard.LEFT = true;
    }
    if (e.keyCode == '38') {
        keyboard.UP = true;
    }
    if (e.keyCode == '32') {
        keyboard.SPACE = true;
    }
    if (e.keyCode == '68') {
        keyboard.D = true;
    }
});

document.addEventListener("keyup", (e) => {
    if (e.keyCode == '39') {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == '40') {
        keyboard.DOWN = false;
    }
    if (e.keyCode == '37') {
        keyboard.LEFT = false;
    }
    if (e.keyCode == '38') {
        keyboard.UP = false;
    }
    if (e.keyCode == '32') {
        keyboard.SPACE = false;
    }
    if (e.keyCode == '68') {
        keyboard.D = false;
    }
});