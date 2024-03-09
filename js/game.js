let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let soundOn = false;

const leftWalkingElement = document.getElementById('left-key-border');
const rightWalkingElement = document.getElementById('right-key-border');
const throwingClickElement = document.getElementById('d-key-id');
const jumpingClickElement = document.getElementById('space-key-id');

/**
 * This function adds the game canvas to the site
 */
function getHTMLCanvas() {
    document.getElementById('start-screen').innerHTML = `
        <canvas id="canvas" width="720" height="480"></canvas>
    `;
}

/**
 * After the game ends the canvas will be changed to the start screen
 */
function getBackToStartScreen() {
    document.getElementById('start-screen').innerHTML = `
        <div class="screen-image">
            <div class="start-button" onclick="init()">Start</div>
        </div>
    `;
}

/**
 * Stops all intervals and uses another function after 2 seconds
 */
function stopGame() {
    for (let i = 0; i < 9999; i++) {
        window.clearInterval(i);
    }
    setTimeout(() => {
        getBackToStartScreen();
    }, 2000);
}

/**
 * All sounds in the game will be muted or unmutes all sounds
 */
function muteSounds() {
    if (soundOn) {
        soundOn = false;
        document.getElementById('sound-button').src = 'img/icons/stumm.png';
        muteAndMuteStartScreen();
        background_sound.muted = true;
    }
    else {
        soundOn = true;
        document.getElementById('sound-button').src = 'img/icons/audio.png';
        muteAndMuteStartScreen();
        background_sound.muted = false;
        background_sound.play();
    }
}

/**
 * Mutes and unmutes all sounds in the game if the world object is active
 */
function muteAndMuteStartScreen() {
    if (world) {
        world.muteAndUnmuteAllSounds();
    }
}

/**
 * initlises the canvas and the game objects
 */
function init() {
    getHTMLCanvas();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
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

leftWalkingElement.addEventListener("pointerdown", (e) => {
    keyboard.LEFT = true;
});

rightWalkingElement.addEventListener("pointerdown", (e) => {
    keyboard.RIGHT = true;
});

jumpingClickElement.addEventListener("pointerdown", (e) => {
    keyboard.SPACE = true;
    console.log('jump');
});

throwingClickElement.addEventListener("pointerdown", () => {
    keyboard.D = true;
});

window.addEventListener("pointerout", () => {
    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.SPACE = false;
    keyboard.D = false;
});

window.addEventListener("resize", () => {
    if (screenIsOnLandscapeMode()) {
        changeButtonsIfScreenIsLandscapeMode();
    }
    else {

    }
});

/**
 * 
 * @returns true if the screen is in landscape mode
 */
function screenIsOnLandscapeMode() {
    return screen.width < 1000 && screen.height < 800;
}

/**
 * The jump and throw buttons will be designed differently in landscape mode
 */
function changeButtonsIfScreenIsLandscapeMode() {
    document.getElementById('d-key-id').innerHTML = `
        <img class="bottle-button" src="img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png">
    `;
    document.getElementById('space-key-id').innerHTML = `Jump`;
}

/**
 * Design of jump and throw buttons will be chenged back in portrait mode
 */
function changeButtonsIfScreenIsPortraitMode() {
    document.getElementById('d-key-id').innerHTML = `D`;
    document.getElementById('space-key-id').innerHTML = `Space`;
}