"use strict";

const joke = document.querySelector("#joke");
const btnEl = document.querySelector("#btn");

async function getJoke() {
  try {
    joke.innerHTML = "Updating...";
    btnEl.disabled = true;
    btnEl.innerHTML = "Loading...";
    const api = await fetch(`https://icanhazdadjoke.com/`, {
      headers: {
        Accept: "application/json",
      },
    });
    const res = await api.json();
    joke.innerHTML = res.joke;
    btnEl.disabled = false;
    btnEl.innerHTML = "Tell me a joke";
  } catch (err) {
    joke.innerHTML = `${err.message}, try again later`;
    btnEl.disabled = false;
    btnEl.innerHTML = "Tell me a joke";
  }
}

btnEl.addEventListener("click", getJoke);
