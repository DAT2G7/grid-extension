import { navigateToGrid, updateGridTabIds } from "../common";

import browser from "webextension-polyfill";

// Open the grid when the browser starts
browser.runtime.onStartup.addListener(() => {
    navigateToGrid(true);
});

// Open the grid when the extension is installed
browser.runtime.onInstalled.addListener(() => {
    navigateToGrid();
});

// Update the grid tab ids when a tab is closed
browser.tabs.onRemoved.addListener((tabId) => {
    updateGridTabIds((ids) => ids.filter((id) => id !== tabId));
});
