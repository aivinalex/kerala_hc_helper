import { nodesModule } from "./nodeModule.js";

let causeListController = null;

export const causeListSearch = async function () {
  if (causeListController) causeListController.abort();
  causeListController = new AbortController();

  try {
    const result = await fetch("/api/causelist", {
      signal: causeListController.signal,
    });
    const data = await result.json();

    if (!result.ok) {
      throw new Error(`HTTP error! status: ${result.status}`);
    }

    return data;
  } catch (err) {
    if (err.name !== "AbortError") {
      console.error("Cause list search failed:", err);
    }
    throw err;
  }
};
