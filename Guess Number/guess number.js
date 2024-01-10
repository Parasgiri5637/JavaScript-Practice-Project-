'use strict';

// Logic Solve = Guess Number Game

// (1) Understanding Question
// - how to get random number

// (2) Divide In Small Part
// - First get random number
// - Guess Number Between 1 to 20;
// - score will be 20
// - when we click on chek button if input field are empty then what message should show
// - if guess number match what message should show
// - if guess number note match and high/low then guess number which message should show
// - how to settle score
// - if check guess number score will be decreas by -1 (20 - 1 ) evry time
// - after win game score will show and when next game start old score will show until next score
// - reset game when click on reset button


let secret_Number = Math.trunc(Math.random() * 20) + 1;
// document.querySelector('.number').textContent = secret_Number

let score_number = 20;
let high_Score = 0;

const display_message = (message) => {
    document.querySelector('.message').textContent = message;
}

document.querySelector('.check').addEventListener('click', () => {
    // get value frome input field
    const guess = Number(document.querySelector('.guess').value);
    // when input field is empty
   if(!guess){
    // Function call
    display_message('⛔ No Number!');
   }
    // When Player is win
   else if(guess === secret_Number){
    // Function call
    display_message('🎉 Correct Number');
    document.querySelector('.number').textContent = secret_Number
    // Display high_Score Number
    if(score_number){
        high_Score = score_number;
        document.querySelector('.highscore').textContent = high_Score;
    }
   }
   // when guess number high or low then secret_Number
   else if(guess !== secret_Number){
    if(score_number >= 1){
        // Function call
        display_message(guess > secret_Number ? '📈 To High Number': '📉 To Law Number');
        score_number--;
        document.querySelector('.score').textContent = score_number;
    }else{
        // Function call
        display_message('You Lost The Game');
    }
}
})

// Reset Game
document.querySelector('.reset').addEventListener('click',() => {
    secret_Number = Math.trunc(Math.random() * 20) + 1;
    score_number = 20;
    document.querySelector('.score').textContent = score_number;
    display_message('Start guessing...');
    document.querySelector('.number').textContent = '?';
    document.querySelector('.guess').textContent = '';
})


