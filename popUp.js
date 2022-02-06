// 1st
export default class PopUp{
    constructor(){
        this.popUp = document.querySelector('.pop-up--hide');
        this.refreshBtn = document.querySelector('.pop-up__refresh');
        this.message = document.querySelector('.pop-up__message');
        this.refreshBtn.addEventListener('click', ()=>{
            this.onClick1();
            this.hidePopUp();
            this.onClick2();
        });
    }
    
    eventClickFunction(onClick1, onClick2){
        // 전달 받을 함수가 2개면 어떡하지?
        this.onClick1 = onClick1;
        this.onClick2 = onClick2;
    }

    showPopUp(text){
        this.message.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }
    
    hidePopUp(){
        this.popUp.classList.add('pop-up--hide');
    }
}