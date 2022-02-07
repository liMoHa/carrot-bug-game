'use strict'
import * as sound from './sound.js';

export default class Field{
    constructor(CARROT_SIZE, CARROT_COUNT, BUG_COUNT){
        this.carrotSize = CARROT_SIZE;
        this.carrotCount = CARROT_COUNT;
        this.bugCount = BUG_COUNT;
        
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        // this.onClick = this.onClick.bind(this);
        this.field.addEventListener('click', this.onClick);
    }
    
    // 함수 주소만 전달해주는 것이기 때문에 인자는 신경 ㄴㄴ
    setClickListener(onItemClick){
        this.onItemClick = onItemClick; // binding
        // this.onItemClick = this.onItemClick.bind(this);
    }

    onClick = event => {
        const target = event.target;
        if(target.matches('.carrot')){
            sound.playCarrot();
            target.remove();
            this.onItemClick && this.onItemClick('carrot');
        } else if(target.matches('.bug')){
            this.onItemClick && this.onItemClick('bug');
        }
    }

    init(){
        this.field.innerHTML = '';
        this._putItem('carrot', this.carrotCount, './img/carrot.png');
        this._putItem('bug', this.bugCount, './img/bug.png');
    }

    _putItem(className, count, imgPath ){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - this.carrotSize;
        const y2 = this.fieldRect.height - this.carrotSize;
        for(let i=0; i<count; i++){
            let x = random(x1, x2);
            let y = random(y1, y2);
            const img = document.createElement('img');
            img.setAttribute('class', className);
            img.setAttribute('src', imgPath);
            img.style.position = `absolute`;
            img.style.left = `${x}px`;
            img.style.top = `${y}px`;
            this.field.appendChild(img);
        }
    }
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //최댓값도 포함, 최솟값도 포함
}