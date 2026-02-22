const selectors = {
  searchButton: "#adv-search-button",
  searchData: "#adv-search-input",
  searchDate: "#adv-search-date",
  nameError: "#name-error",
  dateError: "#date-error",
  advocateSuggestionContainer: "#advocateSuggestions",
  advocateSelectionContainer: "#selected-advocates-container",
  advocateSearchSection: "#search-section",
  advocateSearchForm: "#search-form",
  causelistContainer: "#cause-list-section",
  searchBody: "#searchbody",
  tableBody: "#tablebody",
};

export const nodesModule = Object.fromEntries(
  Object.entries(selectors).map(([key, value]) => [
    key,
    document.querySelector(value),
  ]),
);
