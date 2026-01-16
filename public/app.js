"use strict";

//html elements
const searchButton = document.querySelector("#adv-search-button");
const searchData = document.querySelector("#adv-search-input");
const advocateSuggestionContainer = document.querySelector(
  "#advocateSuggestions"
);
const advocateSelectionContainer = document.querySelector(
  "#selected-advocates-container"
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
  advocateCache: new Map(),

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
    // disyplay suhhesion
    this.clearSuggestion();

    data.results.forEach((element) => {
      // create selection list
      const newDev = document.createElement("div");
      newDev.className = " px-6 py-3 text-sm cursor-pointer hover:bg-[#f4ecd8]";
      newDev.textContent = element.label;
      newDev.dataset.keyval = element.keyval;
      this.advocateCache.set(element.keyval, element); // store data into map using key vale

      advocateSuggestionContainer.appendChild(newDev); // render the creraetd html suggestion
    });
  },
  clearSuggestion: function () {
    advocateSuggestionContainer.innerHTML = "";
    this.advocateCache.clear();
    return;
  },

  renderSelection: function () {
    advocateSelectionContainer.innerHTML = "";
    this.selectedAdvocates.forEach((element) => {
      const newPill = document.createElement("div");
      newPill.className =
        "flex items-center gap-2 px-3 py-1 bg-[#f4ecd8] border border-[#c9b79c] rounded-full text-sm text-[#5a4a33] shadow-sm animate-fadeIn";
      const newSpan = document.createElement("span");
      newSpan.className = "font-medium";
      newSpan.textContent = element.label;

      const closeBtn = document.createElement("button");
      closeBtn.className =
        "remove-pill-btn hover:text-red-700 font-bold ml-1 cursor-pointer transition-colors";
      closeBtn.textContent = "×";
      closeBtn.dataset.keyval = element.keyval;
      newPill.appendChild(newSpan);
      newPill.appendChild(closeBtn);
      advocateSelectionContainer.appendChild(newPill);
    });
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
}); //  debounced search and render suggestions

document.addEventListener("click", (e) => {
  e.preventDefault();
  const isSearchinput = searchData.contains(e.target); // check wether clicked is a child element of searchdata
  const isSelectioninput = advocateSuggestionContainer.contains(e.target); // same as above

  if (!isSearchinput && !isSelectioninput) advocateDetail.clearSuggestion();
}); // for cleraing on outside click

advocateSuggestionContainer.addEventListener("click", (e) => {
  e.preventDefault();
  const itemClicked = e.target.closest("[data-keyval]"); //saved the closed child elemem which has the key
  if (!itemClicked) return;
  const selected = itemClicked.dataset.keyval; // get keyvalue
  const data = advocateDetail.advocateCache.get(selected); // get the data from map where key value is key value
  advocateDetail.selectedAdvocates.add(data); // add selected into  selected advocates
  console.log(advocateDetail.selectedAdvocates);
  advocateDetail.renderSelection();
});
