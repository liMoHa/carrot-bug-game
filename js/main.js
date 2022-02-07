// start refactoring
'use strice';

import PopUp from './popUp.js';
import * as sound from './sound.js';
import {GameBuilder, Reason} from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.gameCarrotCount(5)
.gameBugCount(5)
.gameTimeDuration(3)
.gameBuild();

// 이렇게 작성하는 게 익숙해지도록 하자. 함수가 변수에 저장되고 전달되고 하는 게 가능해서 이런 게 됨...ㅎㄷㄷㄷ
game.onStopListener((reason)=>{
    let message = ""
    switch(reason){
        case Reason.win:
            sound.playGameWin();
            message = "You won :D"
            break;
        case Reason.lose:
            sound.playBug();
            message = "You lost :("
            break;
        case Reason.cancel:
            sound.playAlert();
            message = "Replay?"
            break;
        default:
            throw new Error("error");
    }
    gameFinishBanner.showPopUp(message);
});

gameFinishBanner.eventClickFunction(() => game.start());



/*

function setClickListener(onClick){
    this.onClick = onclick;
}

function a(){
    this.onclick();
}

*/