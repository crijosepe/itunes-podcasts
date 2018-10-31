import Format from './Format';

const readLocalStorage = (name) => {
    try {
        const item = localStorage.getItem(name);
        if (!item) {
            return undefined;
        }
        return JSON.parse(item);
    } catch (e) {
        console.error('Error reading from local storage', e);
        return undefined;
    }
};

const writeLocalStorage = (name, data) => {
    try {
        const serializedData = JSON.stringify(data);
        localStorage.setItem(name, serializedData);
    } catch (e) {
        console.error('Error writing at local storage', e);
    }
};

const Storage = {
    getItem: (name) => {
        const data = readLocalStorage(name);
        if (data && data.syncDate && !Format.isDateBeforeYesterday(data.syncDate)) {
            return data.result;
        }
        return null;
    },

    saveItem: (name, data) => {
        writeLocalStorage(name, {
            syncDate: new Date(),
            result: data,
        });
    },
};

export default Storage;
