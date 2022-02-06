// start refactoring
'use strice';

import PopUp from './popUp.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 15;
const BUG_COUNT = 15;
const TIME_VALUE = 10;

const button = document.querySelector('.game__button');
const timer = document.querySelector('.game__timer');
const score = document.querySelector('.game__score');
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect();

const bgSound = new Audio("./sound/bg.mp3");
const alertSound = new Audio("./sound/alert.wav");
const bugPullSound = new Audio("./sound/bug_pull.mp3");
const carrotPullSound = new Audio("./sound/carrot_pull.mp3");
const gameWinSound = new Audio("./sound/game_win.mp3");

let started = false;
let interverID = undefined;
let clickedCarrot = 0;

const gameFinishBanner = new PopUp();
gameFinishBanner.eventClickFunction(showButton, startGame);

button.addEventListener('click', ()=>{
    if(started) stopGame("Replay?");
    else startGame();
});

// refreshBtn.addEventListener('click', ()=>{
//     showButton();
//     hidePopUp();
//     startGame();
// });

field.addEventListener('click', onFieldClick);

function startGame(){
    started = true;
    playSound(bgSound);
    showScore();
    startTimer();
    changeBtn();
    initItem();
}

function stopGame(text){
    started = false;
    if(text === 'You won'){
        playSound(gameWinSound);
    }
    else if(text === 'You lost'){
        playSound(bugPullSound);
    }
    else{
        playSound(alertSound)
    }
    pauseSound(bgSound);
    stopTimer();
    gameFinishBanner.showPopUp(text);
    hideButton();
}

// 타이머 설정 다시 확인
function startTimer(){
    let remainingTimeSec = TIME_VALUE;
    showTimer(remainingTimeSec);
    interverID = setInterval(()=>{
        showTimer(--remainingTimeSec);
        if(remainingTimeSec <= 0) {
            stopGame('You lost');
        }
    }, 1000);
}

function stopTimer(){
    clearInterval(interverID);
}

function showTimer(remainingTimeSec){
    let minute =  Math.floor(remainingTimeSec / 60);
    let second = remainingTimeSec % 60;
    timer.innerText = `${minute} : ${second}`;
    timer.style.visibility = `visible`;
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

function initItem(){
    field.innerHTML = ``;
    clickedCarrot = 0;
    putItem('carrot', CARROT_COUNT, './img/carrot.png');
    putItem('bug', BUG_COUNT, './img/bug.png');
}

function putItem(className, count, imgPath ){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for(let i=0; i<count; i++){
        let x = random(x1, x2);
        let y = random(y1, y2);
        const img = document.createElement('img');
        img.setAttribute('class', className);
        img.setAttribute('src', imgPath);
        img.style.position = `absolute`;
        img.style.left = `${x}px`;
        img.style.top = `${y}px`;
        field.appendChild(img);
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}

function onFieldClick(event){
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){
        playSound(carrotPullSound);
        target.remove();
        clickedCarrot++;
        updateScore();
        if(clickedCarrot === CARROT_COUNT){
            stopGame('You won');
        }
    } else if(target.matches('.bug')){
        stopGame("You lost");
    }
}

function playSound(audio){
    audio.currentTime = 0;
    audio.play();
}

function pauseSound(audio){
    audio.pause();
}
