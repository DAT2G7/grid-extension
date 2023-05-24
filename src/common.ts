import { GRID_SERVER_URL } from "./config";
import _ from "lodash";
import browser from "webextension-polyfill";

export enum StorageKeyLocal {
    GridTabs = "grid-tabs"
}

/** Get ids for tracked tabs from browser storage */
export const getGridTabIds = async (): Promise<number[]> => {
    const data = await browser.storage.local.get({
        [StorageKeyLocal.GridTabs]: []
    });
    return data[StorageKeyLocal.GridTabs];
};

/**
 * Set ids for tracked tabs in browser storage.
 * Overwrites any existing data
 */
export const setGridTabIds = async (tabIds: number[]) => {
    await browser.storage.local.set({
        [StorageKeyLocal.GridTabs]: [tabIds]
    });
};

/**
 * Updates the list of stored grid tab ids.
 * Does not perfom any actions if callback changes no ids
 */
export const updateGridTabIds = async (
    callback: (tabIds: number[]) => number[]
) => {
    const ids = await getGridTabIds();
    const newIds = callback(ids);
    if (!_.isEqual(ids, newIds)) await setGridTabIds(newIds);
};

/** Clear all data from browser storage */
export const clearStorage = async () => {
    await browser.storage.local.clear();
};

/** Open grid in new tab */
export const navigateToGrid = async (quiet = false) => {
    const url = new URL(GRID_SERVER_URL + "/client");
    url.searchParams.set("quiet", quiet.toString());

    // Open new tab and get already tracked tab ids
    const [tab, keys] = await Promise.all([
        browser.tabs.create({
            url: url.toString()
        }),
        getGridTabIds()
    ]);

    if (!tab.id) return;

    // Update ids if tab was created successfully
    setGridTabIds([...keys, tab.id]);
};
