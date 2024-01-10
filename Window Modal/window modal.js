'use strict';

const modal = [document.querySelector('.modal1'),document.querySelector('.modal2'),document.querySelector('.modal3')]// photos
const overlay = document.querySelector('.overlay');// backgrond iffect
const close_modal = [document.querySelector('.close-modal1'),
document.querySelector('.close-modal2'),document.querySelector('.close-modal3')]// close photos
const hidden = document.querySelector('.hidden');// hidden all photos and css
const show_modal = document.querySelectorAll('.show-modal');//button



for(let i = 0; i < show_modal.length; i++){
        show_modal[i].addEventListener('click',() =>{
        modal[i].classList.remove("hidden");
           overlay.classList.remove("hidden");
        })
}



for(let j  = 0; j < close_modal.length; j++){
   close_modal[j].addEventListener('click', () => {
      modal[j].classList.add('hidden');
      overlay.classList.add('hidden');
   })
}




