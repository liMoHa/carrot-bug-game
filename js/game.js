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
        this.timeValue = TIME_VALUE;
        
        this.gameField = new Field(CARROT_COUNT, BUG_COUNT);
        this.gameField.setClickListener(this.onItemClick);
        
        this.score = document.querySelector('.game__score');
        
        this.timer = document.querySelector('.game__timer');
        this.interverID = undefined;
        
        this.button = document.querySelector('.game__button');
        this.button.addEventListener('click', ()=>{
            if(this.started) this.stop(Reason.cancel);
            else this.start();
        });

        this.started = false;
        this.clickedCarrot = 0;
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
                this.stop(Reason.win);
            }
        } else if(target.matches('.bug')){
            this.stop(Reason.lose); 
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
        this.onStop && this.onStop(reason);
    }

    initItem(){
        this.clickedCarrot = 0;
        this.gameField.init();
    }

    startTimer(){
        let remainingTimeSec = this.timeValue;
        this.showTimer(remainingTimeSec);
        this.interverID = setInterval(()=>{
            this.showTimer(--remainingTimeSec);
            if(remainingTimeSec <= 0) {
                this.stop(this.clickedCarrot <= this.carrotCount ?  Reason.lose : Reason.win);
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