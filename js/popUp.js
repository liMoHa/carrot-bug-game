// 1st
export default class PopUp{
    constructor(){
        this.popUp = document.querySelector('.pop-up--hide');
        this.refreshBtn = document.querySelector('.pop-up__refresh');
        this.message = document.querySelector('.pop-up__message');
        this.refreshBtn.addEventListener('click', ()=>{
            this.hidePopUp();
            this.onClick();
        });
    }
    
    eventClickFunction(onClick){
        this.onClick = onClick;
    }

    showPopUp(text){
        this.message.innerText = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hidePopUp(){
        this.popUp.classList.add('pop-up--hide');
    }
}