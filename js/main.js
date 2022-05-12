'use strice';

import PopUp from './popUp.js';
import * as sound from './sound.js';
import {GameBuilder, Reason} from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.gameCarrotCount(7)
.gameBugCount(7)
.gameTimeDuration(10)
.gameBuild();

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