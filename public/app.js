"use strict";

const searchButton = document.querySelector("#adv-search-button");
const searchData = document.querySelector("#adv-search-input");

const advocateSearch = async function (advocateName) {
  try {
    const params = new URLSearchParams({ name: advocateName });

    const res = await fetch(`/api/advocates?${params}`);
    if (!res.ok) {
      throw new Error("Server responded with an error");
    }
    const data = await res.json();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
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

const advocateSearchDebounce = debounce(advocateSearch, 300); // debounced advocaet serach

searchData.addEventListener("input", (e) => {
  // e.preventDefault(); not nededed , needed only in forms
  const searchValue = searchData.value?.trim().toLowerCase();
  if (!searchValue) return;
  if (searchValue.length < 4) return;
  advocateSearchDebounce(searchValue);
});
