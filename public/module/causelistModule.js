import { nodesModule } from "./nodeModule.js";

let causeListController = null;
const { tableBody, cardContainer, cardTemplate, tableRowTemplate } =
  nodesModule;

export const causeListSearch = async function (date, selectedAdvocates) {
  const selectedArray = Array.from(selectedAdvocates, ([key, value]) => ({
    name: value.label,
    advoCode: key,
  }));

  if (causeListController) causeListController.abort();
  causeListController = new AbortController();

  try {
    const result = await fetch("/api/causelist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        advocates: selectedArray,
        date,
      }),
      signal: causeListController.signal,
    });

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    const data = await result.json();
    return data;
  } catch (err) {
    if (err.name !== "AbortError") {
      console.error("Cause list search failed:", err);
    }
    throw err;
  }
};

export const caselistMerge = function (data) {
  const seen = new Set();
  const mergedList = data.results.reduce(
    (acc, current) => {
      if (current.caselist) {
        for (const value of current.caselist) {
          const combinedKey = `${value.itemNo}-${value.courtHall}`;
          if (!seen.has(combinedKey)) {
            seen.add(combinedKey);
            acc.causelist.push(value);
          }
        }
      } else acc.noListAdvocate.push(current.advocate);

      return acc;
    },
    { causelist: [], noListAdvocate: [] },
  );

  mergedList.causelist.sort((itemA, ItemB) => {
    const primary = itemA.courtHall.localeCompare(ItemB.courtHall, undefined, {
      numeric: true,
    });
    if (primary !== 0) return primary;
    return Number(itemA.itemNo) - Number(ItemB.itemNo);
  });

  return mergedList;
};

export const createTableDesktop = function (data) {
  tableBody.innerHTML = "";

  data.causelist.forEach((element, i) => {
    const cloneRow = tableRowTemplate.content.cloneNode(true);

    cloneRow.querySelector(".js-sl-no").textContent = i + 1;
    cloneRow.querySelector(".js-case-no").textContent = element.caseNo;
    cloneRow.querySelector(".js-parties").textContent = element.parties;
    cloneRow.querySelector(".js-stage").textContent = element.list;
    cloneRow.querySelector(".js-bench").textContent = element.benchName;
    cloneRow.querySelector(".js-court").textContent = element.courtHall;

    const itemCell = cloneRow.querySelector(".js-item");
    itemCell.textContent = `item ${element.itemNo}`;
    itemCell.appendChild(document.createElement("br")); // Add the break

    // Create a span for the sub-items to style them if needed
    const subItems = document.createElement("span");
    subItems.textContent = element.items || "";
    itemCell.appendChild(subItems);
    tableBody.appendChild(cloneRow);
  });
};

export const createCardMobile = (data) => {
  cardContainer.innerHTML = "";

  data.causelist.forEach((element) => {
    const clone = cardTemplate.content.cloneNode(true);

    clone.querySelector(".js-item-no").textContent = element.itemNo;
    clone.querySelector(".js-case-no").textContent = element.caseNo;
    clone.querySelector(".js-parties").textContent = element.parties;
    clone.querySelector(".js-list").textContent = element.list;
    clone.querySelector(".js-bench").textContent = element.benchName;
    clone.querySelector(".js-court").textContent = element.courtHall;
    clone.querySelector(".js-items").textContent = element.items;

    cardContainer.appendChild(clone);
  });
};
