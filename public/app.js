"use strict";
//html elements
const searchButton = document.querySelector("#adv-search-button");
const searchData = document.querySelector("#adv-search-input");
const advocateSuggestionContainer = document.querySelector(
  "#advocateSuggestions"
);

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

const advocateDetail = {
  selectedAdvocates: new Set(),

  search: async function (advocateName) {
    try {
      const params = new URLSearchParams({ name: advocateName });

      const res = await fetch(`/api/advocates?${params}`);
      if (!res.ok) {
        throw new Error("Server responded with an error");
      }
      const data = await res.json();
      console.log(data);
      this.displaySuggestion(data);
    } catch (err) {
      console.log(err);
    }
  },
  displaySuggestion: function (data) {
    advocateSuggestionContainer.innerHTML = "";

    data.results.forEach((element) => {
      const newDev = document.createElement("div");
      newDev.className = " px-6 py-3 text-sm cursor-pointer hover:bg-[#f4ecd8]";
      newDev.textContent = element.label;
      advocateSuggestionContainer.appendChild(newDev);
    });
  },
  clearSuggestion: function () {
    advocateSuggestionContainer.innerHTML = "";
    return;
  },
};

advocateDetail.advocateSearchDebounce = debounce(
  advocateDetail.search.bind(advocateDetail),
  500
);
//event Litsners
searchData.addEventListener("input", (e) => {
  // serach value check
  // e.preventDefault(); not nededed , needed only in forms
  const searchValue = searchData.value?.trim().toLowerCase();
  if (!searchValue || searchValue.length < 4) {
    advocateDetail.clearSuggestion();
    return;
  }

  advocateDetail.advocateSearchDebounce(searchValue);
});
document.addEventListener("click", (e) => {
  const isSearchinput = searchData.contains(e.target); // check wether seach data is a child element of clicked
  const isSelectioninput = advocateSuggestionContainer.contains(e.target); // same as above

  if (!isSearchinput && !isSelectioninput) advocateDetail.clearSuggestion();
});
