import Field from './field.js';
import * as sound from './sound.js';


export default class Game{
    constructor(CARROT_COUNT, BUG_COUNT, TIME_VALUE){
        this.started = false;
        this.clickedCarrot = 0;
        this.carrotCount = CARROT_COUNT;
        this.gameField = new Field(CARROT_COUNT, BUG_COUNT);
        this.gameField.setClickListener(this.onItemClick);
        this.button = document.querySelector('.game__button');
        this.score = document.querySelector('.game__score');
        this.timer = document.querySelector('.game__timer');
        this.interverID = undefined;
        this.timeValue = TIME_VALUE; // 이런 상수 값은 어디에 속해야 하지?
        this.button.addEventListener('click', ()=>{
            if(this.started) this.stop("Replay?");
            else this.start();
        });
        // 그러니까 한 번 호출되면 이후부터는 this 함수가 아니라는 얘기지?
    }

    onStopListener(onStop){
        this.onStop = onStop;
    }

    onItemClick = target => {
        if(!this.started){
            return;
        }
        if(target.matches('.carrot')){
            sound.playCarrot();
            target.remove();
            this.clickedCarrot++;
            this.updateScore();
            if(this.clickedCarrot === this.carrotCount){
                this.stop('You won');
            }
        } else if(target.matches('.bug')){
            this.stop("You lost");
        }
    }
    
    start(){
        this.started = true;
        sound.playBg();
        this.initItem();
        this.showButton();
        this.showScore();
        this.changeBtn();
        this.startTimer();
    }
    
    stop(text){
        this.started = false;
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
        this.stopTimer();
        this.hideButton();
        console.log(text);

        // gameFinishBanner.showPopUp(text);// 얘 다른 걸로 변경
        this.onStop && this.onStop(text);
    }

    initItem(){
        this.clickedCarrot = 0;
        this.gameField.init();
    }

    // 인자 전달 받을 땐...?
    startTimer(){
        let remainingTimeSec = this.timeValue;
        this.showTimer(remainingTimeSec);
        this.interverID = setInterval(()=>{
            this.showTimer(--remainingTimeSec);
            if(remainingTimeSec <= 0) {
                this.stop('You lost');// 여기 정리할 순 없나
            }
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.interverID);
    }

    showTimer(remainingTimeSec){
        let minute =  Math.floor(remainingTimeSec / 60);
        let second = remainingTimeSec % 60;
        this.timer.innerText = `${minute} : ${second}`;
        this.timer.style.visibility = 'visible';
    }

    showScore(){
        this.score.style.visibility = 'visible';
        this.score.innerText = `${this.carrotCount}`
    }
    
    showButton(){
        this.button.style.visibility = 'visible';
    }
    
    hideButton(){
        this.button.style.visibility = 'hidden';
    
    }
    
    changeBtn(){
        const startBtn = document.querySelector('.game__button i');
        startBtn.classList.remove('fa-play');
        startBtn.classList.add('fa-stop');
    }
    
    updateScore(){
        this.score.innerText = `${this.carrotCount - this.clickedCarrot}`;
    }
}