import { toggleErrorMessager, isLoading } from "./helperModule.js";
import { advocateDetail } from "./advocateModule.js";
import { nodesModule } from "./nodeModule.js";
import {
  causeListSearch,
  caselistMerge,
  createTableDesktop,
  createCardMobile,
} from "./causelistModule.js";

export const initEventListeners = function () {
  const {
    searchButton,
    searchData,
    searchDate,
    nameError,
    dateError,
    advocateSuggestionContainer,
    advocateSelectionContainer,
    searchBody,
  } = nodesModule;

  searchData.addEventListener("focus", () => {
    toggleErrorMessager(searchData, nameError, false);
  });
  searchDate.addEventListener("focus", () => {
    toggleErrorMessager(searchDate, dateError, false);
  });

  searchData.addEventListener("input", () => {
    const searchValue = searchData.value?.trim().toLowerCase();
    if (!searchValue || searchValue.length < 4) {
      advocateDetail.clearSuggestion();
      advocateDetail.advocateSearchDebounce.cancel();
      return;
    }
    advocateDetail.advocateSearchDebounce(searchValue);
  });

  document.addEventListener("click", (e) => {
    const isSearchinput = searchData.contains(e.target);
    const isSelectioninput = advocateSuggestionContainer.contains(e.target);
    if (!isSearchinput && !isSelectioninput) advocateDetail.clearSuggestion();
  });

  advocateSuggestionContainer.addEventListener("click", (e) => {
    const itemClicked = e.target.closest("[data-keyval]");
    if (!itemClicked) return;
    const selected = itemClicked.dataset.keyval;
    const data = advocateDetail.advocateCache.get(selected);
    if (advocateDetail.selectedAdvocates.has(selected)) {
      return;
    }
    advocateDetail.selectedAdvocates.set(selected, data);
    advocateDetail.renderSelection();
  });

  advocateSelectionContainer.addEventListener("click", (e) => {
    advocateDetail.pillRemove(e);
  });

  searchButton.addEventListener("click", async (e) => {
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
    const date = searchDate.value;

    isLoading(true);

    try {
      const data = await causeListSearch(
        date,
        advocateDetail.selectedAdvocates,
      );

      if (data.results?.length) {
        const mergedData = caselistMerge(data);
        createTableDesktop(mergedData);
        createCardMobile(mergedData);

        searchBody.classList.add("search-active");
      }
    } catch (err) {
      console.error(err);
    } finally {
      isLoading(false);
    }
  });

  searchData.addEventListener("focus", () => {
    toggleErrorMessager(searchData, nameError, false);
  });
};
