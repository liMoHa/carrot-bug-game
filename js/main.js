// start refactoring
'use strice';

import PopUp from './popUp.js';
import GameBuilder from './game.js';

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.gameCarrotCount(5)
.gameBugCount(5)
.gameTimeDuration(3)
.gameBuild();

// 이렇게 작성하는 게 익숙해지도록 하자. 함수가 변수에 저장되고 전달되고 하는 게 가능해서 이런 게 됨...ㅎㄷㄷㄷ
game.onStopListener((text)=>{
    gameFinishBanner.showPopUp(text);
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