'use strict'
import * as sound from './sound.js';

const CARROT_SIZE = 80;

export default class Field{
    constructor(CARROT_COUNT, BUG_COUNT){
        this.carrotCount = CARROT_COUNT;
        this.bugCount = BUG_COUNT;
        this.field = document.querySelector('.game__field');
        this.fieldRect = this.field.getBoundingClientRect();
        this.field.addEventListener('click', this.onClick);
    }
    
    setClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    onClick = (event) => {
        const target = event.target;
        if(target.matches('.carrot')){
            this.onItemClick && this.onItemClick(target); 
        } else if(target.matches('.bug')){
            this.onItemClick && this.onItemClick(target);
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
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
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
    return Math.floor(Math.random() * (max - min + 1)) + min; 
}