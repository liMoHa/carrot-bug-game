import Field from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win: "win",
    lose: "lose",
    cancel: "cancel",
});

export class GameBuilder{
    gameCarrotCount(carrotCount){
        this.carrotCount = carrotCount;
        return this;
    }

    gameBugCount(bugCount){
        this.bugCount = bugCount;
        return this;
    }

    gameTimeDuration(timeDuration){
        this.timeDuration = timeDuration;
        return this;
    }

    gameBuild(){
        return new Game(
            this.carrotCount, 
            this.bugCount, 
            this.timeDuration
        );
    }

}

class Game{
    constructor(CARROT_COUNT, BUG_COUNT, TIME_VALUE){
        this.carrotCount = CARROT_COUNT;
        this.timeValue = TIME_VALUE; // 이런 상수 값은 어디에 속해야 하지?
        
        this.gameField = new Field(CARROT_COUNT, BUG_COUNT);
        this.gameField.setClickListener(this.onItemClick);
        
        this.score = document.querySelector('.game__score');
        
        this.timer = document.querySelector('.game__timer');
        this.interverID = undefined;
        
        this.button = document.querySelector('.game__button');
        this.button.addEventListener('click', ()=>{
            if(this.started) this.stop(Reason.cancel); // be called when the stop button is clicked.
            else this.start();
        });

        this.started = false;
        this.clickedCarrot = 0;
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
                this.stop(Reason.win); // is called when all carrots are clicked.
            }
        } else if(target.matches('.bug')){
            this.stop(Reason.lose); // is called when any bug clicked.
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
    
    stop(reason){
        this.started = false;
        this.stopTimer();
        this.hideButton();
        sound.pauseBg();
        // gameFinishBanner.showPopUp(text);// 얘 다른 걸로 변경
        this.onStop && this.onStop(reason);
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
                this.stop(this.clickedCarrot <= this.carrotCount ?  Reason.lose : Reason.win); // is called when the timer is over
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