var groupBy = require('json-groupby');

export function SetLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

export function GetLocalStorage(key) {
    return localStorage.getItem(key);
}

export function RemoveLocalStorage(key) {
    return localStorage.removeItem(key);
}

export function GroupingByDateData(array_data, key_column) {
    if (Array.isArray(array_data) && array_data.length > 0) {
        return groupBy(array_data,[key_column]);
    }
    return [];
}