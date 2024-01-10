"use strict";

const btnEl = document.querySelector("#btn");
const anime_containerEl = document.querySelector("#anime_container");
const imgEl = document.querySelector("#anime_img");
const h3El = document.querySelector("h3");

btnEl.addEventListener("click", getAnime);

async function getAnime() {
  try {
    btnEl.disabled = true;
    btnEl.innerHTML = "Loading...";
    h3El.innerHTML = "Updating...";
    imgEl.src = "spinner.svg";
    const api = await fetch(`https://api.catboys.com/img`);
    const res = await api.json();
    btnEl.disabled = false;
    btnEl.innerHTML = "Get Anime";
    anime_containerEl.style.display = "block";
    imgEl.src = res.url;
    h3El.innerHTML = res.artist;
    console.log(res.url, res.artist);
  } catch (err) {
    btnEl.disabled = false;
    btnEl.innerHTML = "Get Anime";
    h3El.innerHTML = new Error(`${err.message}, try again later`);
  }
}
