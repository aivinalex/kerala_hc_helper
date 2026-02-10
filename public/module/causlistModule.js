import { nodesModule } from "./nodeModule.js";

let causeListController = null;

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
    console.log(data);
    return data;
  } catch (err) {
    console.log(err.message);
    if (err.name !== "AbortError") {
      console.error("Cause list search failed:", err);
    }
    throw err;
  }
};
