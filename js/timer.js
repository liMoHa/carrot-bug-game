import {stopGame} from './main.js'; // funtion 이용할 거라 {}로 묶음.

export default class Timer{
    constructor(TIME_VALUE){
        this.timer = document.querySelector('.game__timer');
        this.interverID = undefined;
        this.timeValue = TIME_VALUE; // 이런 상수 값은 어디에 속해야 하지?
    }

    setClickListener(onClick){
        this.onClick = onClick;
    }

    // 인자 전달 받을 땐...?
    startTimer(){
        this.remainingTimeSec = this.timeValue;
        this.showTimer(this.remainingTimeSec);
        this.interverID = setInterval(()=>{
            this.showTimer(--this.remainingTimeSec);
            if(this.remainingTimeSec <= 0) {
                stopGame('You lost');
            }
        }, 1000);
    }

    stopTimer(){
        clearInterval(this.interverID);
    }

    showTimer(remainingTimeSec){
        this.minute =  Math.floor(remainingTimeSec / 60);
        this.second = remainingTimeSec % 60;
        this.timer.innerText = `${this.minute} : ${this.second}`;
        this.timer.style.visibility = `visible`;
    }
}

