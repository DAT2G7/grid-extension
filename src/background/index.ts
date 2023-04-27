import { navigateToGrid, updateGridTabIds } from "../common";

import browser from "webextension-polyfill";

browser.runtime.onStartup.addListener(() => {
    navigateToGrid(true);
});

browser.runtime.onInstalled.addListener(() => {
    navigateToGrid();
});

browser.tabs.onRemoved.addListener(async (tabId) => {
    updateGridTabIds((ids) => ids.filter((id) => id !== tabId));
});
