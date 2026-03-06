// @ts-nocheck
"use strict";

import { advocateDetail } from "./module/advocateModule.js";
import { debounce } from "./module/helperModule.js";
import { initEventListeners } from "./module/initEventListenerModule.js";

// Debounce advocate search to prevent API calls on every keystroke
advocateDetail.advocateSearchDebounce = debounce(
  advocateDetail.search.bind(advocateDetail),
  500,
);

initEventListeners();
