import { GRID_SERVER_URL } from "./config";
import _ from "lodash";

export enum StorageKeyLocal {
    GridTabs = "grid-tabs"
}

export const getGridTabIds = async (): Promise<number[]> => {
    const data = await browser.storage.local.get({
        [StorageKeyLocal.GridTabs]: []
    });
    return data[StorageKeyLocal.GridTabs];
};

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

export const clearStorage = async () => {
    await browser.storage.local.clear();
};

export const navigateToGrid = async (quiet = false) => {
    const url = new URL(GRID_SERVER_URL + "/client");
    url.searchParams.set("quiet", quiet.toString());

    const [tab, keys] = await Promise.all([
        browser.tabs.create({
            url: url.toString()
        }),
        getGridTabIds()
    ]);

    if (!tab.id) return;

    setGridTabIds([...keys, tab.id]);
};
