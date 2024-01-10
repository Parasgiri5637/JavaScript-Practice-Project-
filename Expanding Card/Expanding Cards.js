'use strict';

const panels = document.querySelectorAll('.panel');

// panels.forEach((panel) => {
//     panel.addEventListener('click', () => {
//         remove_activeClass();
//         panel.classList.add('active');
//     })
// })

for(let i = 0; i < panels.length; i++){
    panels[i].addEventListener('click', () => {
        remove_activeClass();
        panels[i].classList.add('active');
    })
}


function remove_activeClass() {
    // panels.forEach((panel) => {
    //     panel.classList.remove('active');
    // })
    for(let i = 0; i < panels.length; i++){
        panels[i].classList.remove('active');
    }
}