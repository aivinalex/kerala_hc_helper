const selectors = {
  searchButton: "#adv-search-button",
  searchData: "#adv-search-input",
  searchDate: "#adv-search-date",
  nameError: "#name-error",
  dateError: "#date-error",
  advocateSuggestionContainer: "#advocateSuggestions",
  advocateSelectionContainer: "#selected-advocates-container",
};

export const nodesModule = Object.fromEntries(
  Object.entries(selectors).map(([key, value]) => [
    key,
    document.querySelector(value),
  ]),
);
