"use strict";

// const formEl = document.getElementById("form");
// const subbtn = document.getElementById("btn");
// const scoreEL = document.getElementById("score");
// const questionEl = document.getElementById("question");
// const inputEl = document.getElementById("input");

// correctAns = 0;

// function generate_question() {
//   const num1 = Math.round(Math.random() * 10);
//   const num2 = Math.round(Math.random() * 10);
//   questionEl.innerText = `What is ${num1} Multiply by ${num2}?`;

//   correctAns = num1 * num2;
// }
// generate_question();
// let user_score = 0;

// function submitEv() {
//   const user_ans = Number(inputEl.value);
//   if (user_ans === correctAns) {
//     user_score++;
//   } else {
//     user_score--;
//   }
//   updatelocalstorage();
//   generate_question();
// }

// subbtn.addEventListener("click", submitEv);

// function updatelocalstorage() {
//   localStorage.setItem("user_score", JSON.stringify(user_score));
//   scoreEL.innerHTML = `Score: ${user_score}`;
// }

const questionEl = document.getElementById("question");
const formEl = document.getElementById("form");
const scoreEl = document.getElementById("score");
const inputEl = document.getElementById("input");

const num1 = Math.round(Math.random() * 10);
const num2 = Math.round(Math.random() * 10);

questionEl.innerText = `What is ${num1} Multiply by ${num2}?`;

const correctAns = num1 * num2;

let score = JSON.parse(localStorage.getItem("score"));
scoreEl.innerText = `Score: ${score}`;

if (!score === 0) {
  score = 0;
}

formEl.addEventListener("submit", () => {
  let user_ans = +inputEl.value;

  if (user_ans === correctAns) {
    score++;
    uplocalstorage();
    console.log(score);
  } else {
    score--;
    uplocalstorage();
  }
});

function uplocalstorage() {
  localStorage.setItem("score", JSON.stringify(score));
}
