/*
***event timing***

start버튼 누르면
    1. 타이머 가동
    2. 당근, 벌레 랜덤 위치 설정
    3. remaningCarrotNum 초기화
    4. start btn 숨기고 stop btn 보이기
    5. play "bg" sound
    6. 시간이 끝나면
        1. you lost로 텍스트 바꿔서 retry화면 보이기
        2. 시작 버튼 없애기

stop버튼 누르면
    1. 타이머 멈춤
    2. retry화면 보이기
    3. stop 버튼 숨기기

retry버튼 누르면 == start btn
    1. 타이머 초기화 및 재가동
    2. 당근, 벌레 위치 재설정
    3. remaningCarrotNum 초기화
    4. stop btn보이기

``` event deligation    
벌레 클릭하면
    1. 타이머 멈춤
    2. you lost로 텍스트 바꿔서 retry화면 보이기
    3. play "bug_pull" sound 

당근 클릭하면
    1. remaningCarrotNum-1 
    2. play "carrot_pull" sound

```

당근 개수가 0이 되면
    1. 타이머 멈춤
    2. you won으로 텍스트 바꿔서 retry화면 보이기
    3. play "game_win" sound
*/

'use strict'

const startBtn = document.querySelector('.info__startBtn');
const stopBtn = document.querySelector('.info__stopBtn');
const remainingCarrotNumElement = document.querySelector('.info__remainingCarrotNum');
const second = document.querySelector('.info__timer .second');
const replay = document.querySelector('.replay');
const replayText = document.querySelector('.replay__text');
const container = document.querySelector('.container');
const containerRect = container.getBoundingClientRect();
let remainingCarrotNum = 8; // global
const bugNum = 7;
let time = 10;
let timeoutID = null;
let timeIntervalID = null;

function timer(text){
    // set timer (maybe 10s)
    time = 10;
    timeIntervalID = setInterval(()=>{
        second.innerHTML = --time;
    }, 1000);
    
    // be called after 10 second
    timeoutID = setTimeout(()=>{
        /* 계속 가동 중일 때만 이걸 실행 만약 스탑 버튼을 눌르거나 버그를 눌렀을
         경우에는 이게 적용되면 안 됨. */
        if(timeIntervalID){
            clearInterval(timeIntervalID); // stop counting
            timeIntervalID = null;
            // replay 화면 보여주기 you lost text로 바꾼 후에!
            replayText.innerHTML = `${text}` // 이거 변수로 받아야 함. ⭐⭐⭐
            replay.classList.remove('invisible');
            // startBtn 숨기기
            stopBtn.classList.add('invisible'); 
            // 벌레, 당근 클릭 안 되게 하기
            // 1. 모든 요소를 가져와서 일일이 classList.add해준다
            // 2. 사전에 벌레와 당근을 담는 container를 만들어서 active됐을 때 pointer-events를 none으로 설정한다.
            container.classList.add('active');
        }
    },3000);
}

function getRandomCoordinates(num){
    // 1. 영역 계산하기 
    let minX = 0;
    let maxX = containerRect.width;
    let minY = 0;
    let maxY = containerRect.height; 
    // 2. randome값으로 x, y값을 담은 배열 만들기
    let array = [];
    for(let i=0; i<num; i++){
        let randomX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
        let randomY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
        array[i] = [randomX, randomY]; // 이게 가능하구나
    }
    return array;
}

function makeSomething(array, name){
    // 3. forEach돌리면서 body의 자식 or 새롭게 영역을 만들어서 그 자식으로 만들기
    array.forEach((coordinates) => {
        const element = document.createElement('img');
        element.setAttribute('src' , `./img/${name}.png `);
        element.setAttribute('class' , `${name}`);
        element.style.top = `${coordinates[1]}px`;
        element.style.left = `${coordinates[0]}px`;
        container.append(element);
    });
}

function startGame(){
    // set timer
    timer('You lost 😈');
    // show stop Btn
    startBtn.classList.add('invisible');
    stopBtn.classList.remove('invisible');
    // set remaining the number of carrots 
    remainingCarrotNum = 10;
    remainingCarrotNumElement.innerHTML = `<span>${remainingCarrotNum}</span>`;
    // make carrots and bugs with their num
    // 여기서 영역을 만드는 게 좋을까 아니면 html안에서 만들어 놓는 게 좋을까? 
    makeSomething(getRandomCoordinates(remainingCarrotNum), "carrot");
    makeSomething(getRandomCoordinates(7), "bug");
}

// when the start button is cliked
startBtn.addEventListener('click', startGame);



// document.addEventListener('click',(e)=>{
//     console.log('x:', e.pageX);
//     console.log('y:', e.pageY);

// })

// console.log('windowX', window.innerWidth);
// console.log('windowY', window.innerHeight);

