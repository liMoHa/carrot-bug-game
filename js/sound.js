const bgSound = new Audio("../sound/bg.mp3");
const alertSound = new Audio("../sound/alert.wav");
const bugPullSound = new Audio("../sound/bug_pull.mp3");
const carrotPullSound = new Audio("../sound/carrot_pull.mp3");
const gameWinSound = new Audio("../sound/game_win.mp3");

export function playBg(){
    playSound(bgSound);
}

export function pauseBg(){
    pauseSound(bgSound);
}

export function playCarrot(){
    playSound(carrotPullSound);
}

export function playBug(){
    playSound(bugPullSound);
}

export function playAlert(){
    playSound(alertSound);
}

export function playGameWin(){
    playSound(gameWinSound);
}

function playSound(audio){
    audio.currentTime = 0;
    audio.play();
}

function pauseSound(audio){
    audio.pause();
}
