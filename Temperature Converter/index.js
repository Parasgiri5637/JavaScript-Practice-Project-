"use strict";

const celsiusEl = document.getElementById("celsius");
const fahrenheitEl = document.getElementById("fahrenheit");
const kelvinEl = document.getElementById("kelvin");
const inputEl = document.querySelectorAll("input");

function computeTemp(e) {
  const currenValue = +e.target.value;
  switch (e.target.name) {
    case "celsius":
      fahrenheitEl.value = (currenValue * (9 / 5) + 32).toFixed(2);
      kelvinEl.value = (currenValue + 273.15).toFixed(2);
      break;
    case "fahrenheit":
      celsiusEl.value = (((currenValue - 32) * 5) / 9).toFixed(2);
      kelvinEl.value = (((currenValue - 32) * 5) / 9 + 273.15).toFixed(2);
      break;
    case "kelvin":
      celsiusEl.value = (currenValue - 273.15).toFixed(2);
      fahrenheitEl.value = (((currenValue - 273.15) * 9) / 5 + 32).toFixed(2);
      break;
    default:
      break;
  }
}
