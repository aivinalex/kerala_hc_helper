"use strict";

import {
  BASE_URL,
  headers,
  getCourtFetch,
  encode,
} from "../helpers/helperModule.js";
import { parseCauseList } from "../helpers/causelistParser.js";

const SEARCH_URL = `${BASE_URL}/Casedetailssearch/Casebyadv1`;

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const delayedSearch = async function (searchParamsArray) {
  const results = [];
  const courtFetch = await getCourtFetch();

  for (let i = 0; i < searchParamsArray.length; i++) {
    try {
      const res = await courtFetch(SEARCH_URL, {
        method: "post",
        headers,
        body: searchParamsArray[i].searchURL.toString(),
      });

      const html = await res.text();

      if (html.includes("No cases!")) {
        results.push({
          advocate: searchParamsArray[i].advocate,
          caselist: null,
          success: true,
        });
        continue;
      }

      results.push({
        advocate: searchParamsArray[i].advocate,
        caselist: parseCauseList(html),
        success: true,
      });
    } catch (err) {
      console.error(`Failed to fetch advocate ${i + 1}:`, err.message);
      results.push({
        advocate: searchParamsArray[i].advocate,

        caselist: [],
        success: false,
      });
    }
    await delay(1000 + Math.random() * 1000);
  }

  return results;
};

export const causelistSearch = async function (advocates = [], date) {
  console.log("reached causelist search");
  console.log(advocates, date);
  if (!advocates.length) return [];
  const searchUrlArray = advocates.map((x) => ({
    advocate: x.name,
    searchURL: new URLSearchParams({
      advocate_name: encode(x.name),
      from_date: date,
      adv_cd: x.advoCode,
    }),
  }));

  console.log(searchUrlArray);

  const res = await delayedSearch(searchUrlArray);

  console.log(res);

  return res;
};
