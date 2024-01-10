const searchBtn = document.querySelector(".header-actions");
const searchView = document.querySelector(".search-view");
const arrowBack = document.querySelector(".leading-icon");

searchBtn.addEventListener("click", (e) => {
  if (e.target.classList.contains("m-icon")) {
    searchView.classList.add("active");
  }
});

arrowBack.addEventListener("click", (e) => {
  if (e.target.classList.contains("m-icon")) {
    searchView.classList.remove("active");
  }
});
