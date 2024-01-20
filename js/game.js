let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let soundOn = true;

function getHTMLCanvas() {
    document.getElementById('start-screen').innerHTML = `
        <canvas id="canvas" width="720" height="480"></canvas>
    `;
}

function changeSound() {
    if (soundOn) {
        soundOn = false;
        document.getElementById('sound-button').src = 'img/icons/stumm.png';
    }
    else {
        soundOn = true;
        document.getElementById('sound-button').src = 'img/icons/audio.png';
    }
}

function gameOverScreen() {
    document.getElementById('start-screen').innerHTML += `
        <div class="game-over-screen">
            <div class="endscreen-text">Game Over!</div>
        </div>
        <div class="start-button" onclick="init()">Start</div>
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
        document.getElementById('right-key-border').style = 'border: 3px solid white;';
        document.getElementById('right-key-img').style = 'filter: invert(100%);';
    }
    if (e.keyCode == '40') {
        keyboard.DOWN = true;
    }
    if (e.keyCode == '37') {
        keyboard.LEFT = true;
        document.getElementById('left-key-border').style = 'border: 3px solid white;';
        document.getElementById('left-key-img').style = 'filter: invert(100%);';
    }
    if (e.keyCode == '38') {
        keyboard.UP = true;
    }
    if (e.keyCode == '32') {
        document.getElementById('space-key-id').style = 'color: white;';
        keyboard.SPACE = true;
    }
    if (e.keyCode == '68') {
        keyboard.D = true;
        document.getElementById('d-key-id').style = 'color: white;';
    }
});

document.addEventListener("keyup", (e) => {
    if (e.keyCode == '39') {
        keyboard.RIGHT = false;
        document.getElementById('right-key-border').style = 'border: 3px solid black;';
        document.getElementById('right-key-img').style = 'filter: invert(0);';
    }
    if (e.keyCode == '40') {
        keyboard.DOWN = false;
    }
    if (e.keyCode == '37') {
        keyboard.LEFT = false;
        document.getElementById('left-key-border').style = 'border: 3px solid black;';
        document.getElementById('left-key-img').style = 'filter: invert(0);';
    }
    if (e.keyCode == '38') {
        keyboard.UP = false;
    }
    if (e.keyCode == '32') {
        keyboard.SPACE = false;
        document.getElementById('space-key-id').style = 'color: black;';
    }
    if (e.keyCode == '68') {
        keyboard.D = false;
        document.getElementById('d-key-id').style = 'color: black;';
    }
});