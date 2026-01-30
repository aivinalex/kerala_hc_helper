// @ts-nocheck
"use strict";

import { advocateDetail } from "./module/advocateModule.js";
import { debounce } from "./module/helperModule.js";
import { initEventlisteners } from "./module/initEventLitsnerModule.js";

advocateDetail.advocateSearchDebounce = debounce(
  advocateDetail.search.bind(advocateDetail),
  500,
);

console.log("app.js loaded");
initEventlisteners();
