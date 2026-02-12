"use strict";

import fetchCookie from "fetch-cookie";
import { CookieJar } from "tough-cookie";

export const BASE_URL = "https://hckinfo.keralacourts.in/digicourt/index.php";

export const headers = {
  "User-Agent": "Mozilla/5.0",
  "X-Requested-With": "XMLHttpRequest",
  Accept: "application/json, text/javascript, */*; q=0.01",
  Referer: `${BASE_URL}/Casedetailssearch/Advocatesearch`,
  Origin: "https://hckinfo.keralacourts.in",
  "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
};

const jar = new CookieJar();
const courtFetch = fetchCookie(fetch, jar);

let initialized = false;

export const getCourtFetch = async () => {
  if (!initialized) {
    const initUrl = `${BASE_URL}/Casedetailssearch/findAdvocate`;
    const initParams = new URLSearchParams({ advcode: "0", advname: "" });

    await courtFetch(initUrl, {
      method: "POST",
      headers,
      body: initParams.toString(),
    });

    initialized = true;
  }

  return courtFetch;
};

export const encode = (data) =>
  Buffer.from(encodeURIComponent(data)).toString("base64");

export const randomDelayed = (...args) =>
  new Promise((resolve) =>
    setTimeout(() => resolve(args), Math.random() * 1000)
  );
