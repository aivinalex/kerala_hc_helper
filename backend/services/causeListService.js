"use strict";

import * as cheerio from "cheerio";
import {
  BASE_URL,
  headers,
  getCourtFetch,
  encode,
} from "../helpers/helperModule.js";

const SEARCH_URL = `${BASE_URL}/Casedetailssearch/Casebyadv1`;

export const causlistSearch = async function (advocates = [], date) {
  console.log("reached causelist search");
  console.log(advocates, date);
  if (!advocates.length) return [];
  const searchUrlArray = advocates.map(
    (x) =>
      new URLSearchParams({
        advocate_name: encode(x.name),
        from_date: date,
        adv_cd: x.advoCode,
      }),
  );

  console.log(searchUrlArray);

  // reached here correct from here

  const courtFetch = await getCourtFetch();

  const res = await courtFetch(SEARCH_URL, {
    method: "post",
    headers,
    body: searchUrlArray[0].toString(),
  });

  const text = await res.text();
  console.log(text);

  return "retunrde data";
};
