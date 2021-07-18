import { atom } from "recoil";

export const seoState = atom({
    key: "seoState",
    default: null
});

export const articlesState = atom({
    key: "articlesState",
    default: []
});

export const filterState = atom({
    key: "filterState",
    default: null
});

export const categoriesState = atom({
    key: "categoriesState",
    default: []
});
