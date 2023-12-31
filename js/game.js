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
            <div class="endscreen-text">Game Over!</div>
        </div>
        <div class="start-button" onclick="init()">Start</div>
    `;
}

function youLoseScreen() {
    document.getElementById('start-screen').innerHTML += `
        <img class="lose-screen" style="height: 100%;" src="img/9_intro_outro_screens/game_over/oh no you lost!.png">
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