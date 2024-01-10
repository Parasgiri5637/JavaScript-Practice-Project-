import { apiURL } from "./apiurl.js";

const searchBtn = document.querySelector("#search");
const buttonEl = document.querySelectorAll("button");
const filterable_ProductEl = document.querySelector(".filterable_Product");
const spinnerEl = document.querySelector("#spinner");

async function getProducts() {
  try {
    spinnerEl.style.display = "block";
    const url = await fetch(apiURL);
    const data = await url.json();
    spinnerEl.style.display = "none";

    return data.products;
  } catch (e) {
    console.log(e.message);
  }
}

const productsList = getProducts();
productsList.then((list) => displayProducts(list));

function displayProducts(i) {
  for (const list of i) {
    const html = `<div class="card hide ${list.category}">
    <img src="${list.images[0]}" alt="product image" />
    <div class="card_body">
      <h2 class="title">${list.title}</h2>
      <h3 class="brand">Brand:${list.brand}</h3>
      <p class="description">${list.description}</p>
      <p class="price">Price:${list.price}$</p>
    </div>
  </div>`;

    filterable_ProductEl.insertAdjacentHTML("afterbegin", html);
  }
}

buttonEl.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let category = e.target.getAttribute("data-name");
    filterProduct(category);
  });
});

window.addEventListener("load", () => {
  setTimeout(() => {
    filterProduct("all");
  }, 1000);
});

function filterProduct(data) {
  buttonEl.forEach((btn) => {
    if (data.toUpperCase() === btn.textContent.toUpperCase()) {
      window.history.pushState(
        {},
        "",
        `http://127.0.0.1:5500/index.html?query=${data}`
      );
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    if (data === "all") {
      card.classList.remove("hide");
    } else {
      if (card.classList.contains(data)) {
        card.classList.remove("hide");
      } else {
        card.classList.add("hide");
      }
    }
  });
}

searchBtn.addEventListener("click", () => {
  const inputEl = document.querySelector("#search-input").value;

  let productName = document.querySelectorAll(".title");
  const cards = document.querySelectorAll(".card");
  window.history.pushState(
    {},
    "",
    `http://127.0.0.1:5500/index.html?query=${inputEl}`
  );

  productName.forEach((title, index) => {
    if (title.innerText.toUpperCase().includes(inputEl.toUpperCase())) {
      cards[index].classList.remove("hide");
    } else {
      cards[index].classList.add("hide");
    }
  });
});
