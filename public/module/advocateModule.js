import { nodesModule } from "./nodeModule.js";

const { advocateSuggestionContainer, advocateSelectionContainer } = nodesModule;
export const advocateDetail = {
  selectedAdvocates: new Map(),
  advocateCache: new Map(),
  searchController: null,

  search: async function (advocateName) {
    if (this.searchController) this.searchController.abort();
    this.searchController = new AbortController();
    try {
      const params = new URLSearchParams({ name: advocateName });

      const res = await fetch(`/api/advocates?${params}`, {
        signal: this.searchController.signal,
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        console.log(data);

        throw new Error(data.message);
        //
      }

      this.displaySuggestion(data);
    } catch (err) {
      console.log(err);
      this.clearSuggestion();
      const newDev = document.createElement("div");
      newDev.className = " px-6 py-3 text-sm cursor-pointer hover:bg-[#f4ecd8]";
      newDev.textContent = err.toString().split(":")[1];
      advocateSuggestionContainer.appendChild(newDev);
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

      const closeBtnCreate = document.createElement("button");
      closeBtnCreate.className =
        "remove-pill-btn hover:text-red-700 font-bold ml-1 cursor-pointer transition-colors";
      closeBtnCreate.textContent = "×";
      closeBtnCreate.dataset.keyval = element.keyval;
      newPill.appendChild(newSpan);
      newPill.appendChild(closeBtnCreate);
      advocateSelectionContainer.appendChild(newPill);
      this.clearSuggestion();
    });
  },
  pillRemove: function (e) {
    if (!e.target.classList.contains("remove-pill-btn")) return;
    const selectedRemoved = e.target.dataset.keyval;
    this.selectedAdvocates.delete(selectedRemoved);
    console.log(this.selectedAdvocates);
    console.log("removed");
    this.renderSelection();
  },
};
