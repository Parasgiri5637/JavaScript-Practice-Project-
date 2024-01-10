"use strict";

const heightEl = document.getElementById("height");
const weightEl = document.getElementById("weight");
const btnEl = document.getElementById("btn");
const ansEl = document.getElementById("ans");
const resultEl = document.getElementById("result");

//* Formula = marks_Weight_mass / marks_Height ** 2;
btnEl.addEventListener("click", computeBMI);

function computeBMI() {
  const height = +heightEl.value / 100;
  const weight = +weightEl.value;
  const personBMI = (weight / height ** 2).toFixed(2);

  ansEl.value = personBMI;

  if (personBMI < 16 && personBMI < 18.5) {
    resultEl.textContent = `${personBMI} underweight`;
  }
  if (personBMI > 18.5 && personBMI <= 25) {
    resultEl.textContent = `${personBMI} Normal (healthy weight)`;
  }
  if (personBMI > 25 && personBMI <= 30) {
    resultEl.textContent = `${personBMI} Overweight`;
  }
  if (personBMI > 30 && personBMI <= 35) {
    resultEl.textContent = `${personBMI} Moderately obese`;
  }
  if (personBMI > 35 && personBMI <= 40) {
    resultEl.textContent = `${personBMI} Severely obese`;
  }
  if (personBMI >= 40) {
    resultEl.textContent = `${personBMI} Very severely obese`;
  }
}
