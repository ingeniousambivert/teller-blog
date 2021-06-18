const createLocalstorageItem = (key, value) => {
    localStorage.setItem(key, value);
    return true;
};

const getLocalstorageItem = (key) => {
    return localStorage.getItem(key);
};

export { createLocalstorageItem, getLocalstorageItem };
