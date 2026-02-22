import { nodesModule } from "./nodeModule.js";

let causeListController = null;
const { tablebody } = nodesModule;

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
    console.log(" cause list search sucess full");
    return data;
  } catch (err) {
    console.log(err.message);
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

export const createTable = function (data) {};
