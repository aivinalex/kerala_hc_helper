"use strict";

import fetchCookie from "fetch-cookie";
import { CookieJar } from "tough-cookie";

const jar = new CookieJar(); // creating a  jar for storing cookie
const cookieFetch = fetchCookie(fetch, jar); // now fetch with cookie
const headers = {
  "User-Agent": "Mozilla/5.0",
  "X-Requested-With": "XMLHttpRequest",
  Accept: "application/json, text/javascript, */*; q=0.01",
  Referer:
    "https://hckinfo.keralacourts.in/digicourt/Casedetailssearch/Advocatesearch",
  Origin: "https://hckinfo.keralacourts.in",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

const intilizationUrl =
  "https://hckinfo.keralacourts.in/digicourt/index.php/Casedetailssearch/findAdvocate";

const getadvocateUrl =
  "https://hckinfo.keralacourts.in/digicourt/index.php/Casedetailssearch/getAdvocates/1";

const advocateSearch = async function (advocateName) {
  try {
    const initParams = new URLSearchParams({
      advcode: "0",
      advname: "",
    });

    await cookieFetch(intilizationUrl, {
      method: "post",
      headers,
      body: initParams.toString(),
    });

    const searchBody = new URLSearchParams({
      search: advocateName,
    });

    const res = await cookieFetch(getadvocateUrl, {
      method: "post",
      headers,
      body: searchBody.toString(),
    });

    const data = await res.json();

    console.log(data);
  } catch (err) {
    console.error(err);
  }
};

advocateSearch("manoj ramaswamy");
