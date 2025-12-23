"use strict";

const searchButton = document.querySelector("#adv-search-button");
const searchData = document.querySelector("#adv-search-input");

const advocateSearch = function (advocateName) {
  console.log(`advocate searched is ${advocateName}`);
};

const debounce = function (passedFunction, delay) {
  // first debounce creaetd
  let timer;

  return function (...arg) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      passedFunction(...arg);
    }, delay);
  };
};

const advocateSearchDebounce = debounce(advocateSearch, 1000); // debounced advocaet serach

searchData.addEventListener("input", (e) => {
  // e.preventDefault(); not nededed , needed only in forms
  const searchValue = searchData.value?.trim().toLowerCase();
  if (!searchValue) return;
  if (searchValue.length < 4) return;
  advocateSearchDebounce(searchValue);
});
