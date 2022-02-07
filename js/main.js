// start refactoring
'use strice';

import PopUp from './popUp.js';
import Timer from './timer.js';
import Field from './field.js';
import * as sound from './sound.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 15;
const BUG_COUNT = 15;
const TIME_VALUE = 10;

const score = document.querySelector('.game__score');
const button = document.querySelector('.game__button');


let started = false;
let clickedCarrot = 0;

const gameFinishBanner = new PopUp();
gameFinishBanner.eventClickFunction(startGame);
const gameTimer = new Timer(TIME_VALUE);

const gameField = new Field(CARROT_SIZE, CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);

function initItem(){
    clickedCarrot = 0;
    gameField.init();
}

function onItemClick(target){
    if(!started){
        return;
    }
    if(target.matches('.carrot')){
        clickedCarrot++;
        updateScore();
        if(clickedCarrot === CARROT_COUNT){
            stopGame('You won');
        }
    } else if(target.matches('.bug')){
        stopGame("You lost");
    }
}

button.addEventListener('click', ()=>{
    if(started) stopGame("Replay?");
    else startGame();
});

function startGame(){
    started = true;
    sound.playBg();
    showButton();
    showScore();
    initItem();
    changeBtn();
    gameTimer.startTimer();
}

export function stopGame(text){
    started = false;
    if(text === 'You won'){
        sound.playGameWin();
    }
    else if(text === 'You lost'){
        sound.playBug();
    }
    else{
        sound.playAlert();
    }
    sound.pauseBg();
    gameTimer.stopTimer();
    gameFinishBanner.showPopUp(text);
    hideButton();
}



function showScore(){
    score.style.visibility = `visible`;
    score.innerText = `${CARROT_COUNT}`
}

function showButton(){
    button.style.visibility = `visible`;
}

function hideButton(){
    button.style.visibility = `hidden`;

}

function changeBtn(){
    const startBtn = document.querySelector('.game__button i');
    startBtn.classList.remove('fa-play');
    startBtn.classList.add('fa-stop');
}

function updateScore(){
    score.innerText = `${CARROT_COUNT - clickedCarrot}`;
}