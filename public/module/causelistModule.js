import { nodesModule } from "./nodeModule.js";

let causeListController = null;
const { tableBody, cardContainer, cardTemplate } = nodesModule;

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
  return data.results.reduce(
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
};

export const createTableDesktop = function (data) {
  tableBody.innerHTML = "";

  data.causelist.forEach((element, i) => {
    const tr = document.createElement("tr");
    tr.className = "border-b border-[#e5dcc8]";

    tr.innerHTML = `
      <td class="px-4 py-3">${i + 1}</td>
      <td class="px-4 py-3 whitespace-nowrap">${element.caseNo}</td>
      <td class="px-4 py-3">${element.parties}</td>
      <td class="px-4 py-3">P/R</td>
      <td class="px-4 py-3">${element.list}</td>
      <td class="px-4 py-3">${element.benchName}</td>
       <td class="px-4 py-3">${element.courtHall}</td>
      <td class="px-4 py-3 wrap-break-word">item ${element.itemNo}<br>${element.items || ""}</td>
    `;

    tableBody.appendChild(tr);
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
