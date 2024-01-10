"use strict";

const container = document.querySelector("#container");
const ratingEL = document.querySelectorAll(".rating");
const btnEl = document.querySelector("#btn");

let selectedEL = "";

ratingEL.forEach((rating) => {
  rating.addEventListener("click", (e) => {
    removeActive();
    selectedEL = e.currentTarget.querySelector("small").innerText;
    e.currentTarget.classList.add("active");
  });
});

function removeActive() {
  ratingEL.forEach((cur) => cur.classList.remove("active"));
}

btnEl.addEventListener("click", () => {
  if (selectedEL !== "") {
    container.innerHTML = `<strong>Thank You!</strong>
    <br>
    <br>
    <strong>Feedback:${selectedEL}</strong>
    <br>
    <br>
    <p>We'll use your feedback to improve our customer support.</p>`;
  }
});
