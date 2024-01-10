"use strict";

// Show the spinner
function showSpinner() {
  document.getElementById("spinner").style.display = "block";
}

// Hide the spinner
function hideSpinner() {
  document.getElementById("spinner").style.display = "none";
}

// Simulate loading the product page
function loadProductPage() {
  showSpinner();

  // Perform any necessary actions (e.g., fetching data, rendering the page)

  // Simulate a delay (e.g., 2 seconds) before hiding the spinner
  setTimeout(function () {
    hideSpinner();
  }, 2000);
}

// Call the loadProductPage function when the page is ready
document.addEventListener("DOMContentLoaded", loadProductPage);
