"use strict";

const quotesEl = document.querySelector("#quote");
const authorEl = document.querySelector("#author");
const btnEl = document.querySelector("#btn");

btnEl.addEventListener("click", random_quote);

async function random_quote() {
  try {
    quotesEl.innerHTML = "Updating...";
    authorEl.innerHTML = "Updating...";
    btnEl.innerHTML = "loading...";
    btnEl.disabled = true;
    const api = await fetch(`https://type.fit/api/quotes`);
    const res = await api.json();
    const random_quote = await res[Math.floor(Math.random() * res.length)];
    quotesEl.innerHTML = random_quote.text;
    authorEl.innerHTML = `~ ${random_quote.author}`;
    btnEl.innerHTML = "get a quote";
    btnEl.disabled = false;
  } catch (err) {
    quotesEl.innerHTML = new Error(`${err.message}, try again later`);
    authorEl.innerHTML = new Error(`${err.message}, try again later`);
    btnEl.innerHTML = "get a quote";
    btnEl.disabled = false;
  }
}
