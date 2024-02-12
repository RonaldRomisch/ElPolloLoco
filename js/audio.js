const background_sound = new Audio('audio/background/Sakura-Girl-Daisy-chosic.com_.mp3');
const endboss_sound = new Audio('audio/enemies/albundyx-mexican-turkey-106743.mp3');
const cry_sound = new Audio('audio/enemies/albundyx-mexican-turkey-106743.mp3');
const bottle_sound = new Audio('audio/bottle/bottle_sound.mp3');
const walking_sound = new Audio('audio/character/walking.mp3');
const snoring_sound = new Audio('audio/character/snoring.mp3');
const jumping_sound = new Audio('audio/character/jump.mp3');
const hurt_sound = new Audio('audio/character/hurt.mp3');
const EARN_COIN_SOUND = new Audio('audio/coin/normal.mp3');

let sounds_Array = [
    endboss_sound,
    cry_sound,
    bottle_sound,
    walking_sound,
    snoring_sound,
    jumping_sound,
    hurt_sound,
    EARN_COIN_SOUND
];
background_sound.volume = 0.08;
background_sound.muted = true;