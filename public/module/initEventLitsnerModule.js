import { toggleErrorMessager } from "./helperModule.js";
import { advocateDetail } from "./advocateModule.js";
import { nodesModule } from "./nodeModule.js";
import { causeListSearch } from "./causlistModule.js";

console.log("event listeners intilized");

export const initEventlisteners = function () {
  const {
    searchButton,
    searchData,
    searchDate,
    nameError,
    dateError,
    advocateSuggestionContainer,
    advocateSelectionContainer,
  } = nodesModule;

  searchData.addEventListener("input", (e) => {
    const searchValue = searchData.value?.trim().toLowerCase();
    if (!searchValue || searchValue.length < 4) {
      advocateDetail.clearSuggestion();
      advocateDetail.advocateSearchDebounce.cancel();
      return;
    }
    advocateDetail.advocateSearchDebounce(searchValue);
  }); // devounced search on key stroke

  document.addEventListener("click", (e) => {
    const isSearchinput = searchData.contains(e.target);
    const isSelectioninput = advocateSuggestionContainer.contains(e.target);
    if (!isSearchinput && !isSelectioninput) advocateDetail.clearSuggestion();
  }); // clear suggestion if outside suggestion box

  advocateSuggestionContainer.addEventListener("click", (e) => {
    // selection handler
    const itemClicked = e.target.closest("[data-keyval]");
    if (!itemClicked) return;
    const selected = itemClicked.dataset.keyval;
    const data = advocateDetail.advocateCache.get(selected);
    if (advocateDetail.selectedAdvocates.has(selected)) {
      console.log("already selected");
      return;
    }
    advocateDetail.selectedAdvocates.set(selected, data);
    console.log(advocateDetail.selectedAdvocates);
    console.log("selected");
    advocateDetail.renderSelection();
  });

  advocateSelectionContainer.addEventListener("click", (e) => {
    advocateDetail.pillRemove(e);
  }); // selection pill remove
  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const isDateEmpty = !searchDate.value;
    const isNameSelectedEmpty = advocateDetail.selectedAdvocates.size === 0;

    toggleErrorMessager(searchData, nameError, false);
    toggleErrorMessager(searchDate, dateError, false);
    if (isDateEmpty || isNameSelectedEmpty) {
      if (isDateEmpty) toggleErrorMessager(searchDate, dateError, true);
      if (isNameSelectedEmpty) toggleErrorMessager(searchData, nameError, true);
      return;
    }
    const data = causeListSearch()
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    console.log(data);

    console.log("serach clicked");
  });

  searchData.addEventListener("focus", (e) => {
    toggleErrorMessager(searchData, nameError, false);
  });
};
