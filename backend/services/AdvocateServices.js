"use strict";

import { BASE_URL, headers, getCourtFetch } from "../helpers/helperModule.js";

const getadvocateUrl = `${BASE_URL}/Casedetailssearch/getAdvocates/1`;

export const advocateSearch = async function (advocateName) {
  try {
    const courtFetch = await getCourtFetch();

    const searchBody = new URLSearchParams({
      search: advocateName,
    });

    const res = await courtFetch(getadvocateUrl, {
      method: "post",
      headers,
      body: searchBody.toString(),
    });

    const data = await res.json();
    console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
};
