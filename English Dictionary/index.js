"use strict";

const inputEl = document.querySelector("#input");
const infoEl = document.querySelector("#info-text");
const meaning_containerEl = document.querySelector("#meaning-container");
const titleEl = document.querySelector("#title");
const meaningEl = document.querySelector("#meaning");
const audioEl = document.querySelector("#audio");

async function fetchAPI(word) {
  try {
    meaning_containerEl.style.display = "none";
    infoEl.style.display = "block";
    infoEl.innerHTML = `Searching the meaning of word:${word}`;

    const apiUrl = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const res = await apiUrl.json();

    infoEl.style.display = "none";
    meaning_containerEl.style.display = "block";

    if (res.title) {
      titleEl.innerHTML = word;
      meaningEl.innerHTML = "N/A";
      audioEl.style.display = "none";
    } else {
      audioEl.style.display = "inline-flex";
      titleEl.innerHTML = res[0].word;
      meaningEl.innerHTML = res[0].meanings[0].definitions[0].definition;
      audioEl.src = res[0].phonetics[0].audio;
    }
  } catch (err) {
    console.log(err.message);
    infoEl.innerHTML = `${new Error(`${err.message}, try again latter`)}`;
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchAPI(e.target.value);
  }
});
