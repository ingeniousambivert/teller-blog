import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key: "teller-blog"
});

export const userData = atom({
    key: "userData",
    default: {},
    effects_UNSTABLE: [persistAtom]
});

export const userAuth = atom({
    key: "userAuth",
    default: {},
    effects_UNSTABLE: [persistAtom]
});

export const isAuthenticated = selector({
    key: "isAuthenticated",
    get: ({ get }) => {
        const auth = get(userAuth);
        const { accessToken, refreshToken, id } = auth;
        if (
            accessToken !== null &&
            typeof accessToken !== "undefined" &&
            refreshToken !== null &&
            typeof refreshToken !== "undefined" &&
            id !== null &&
            typeof id !== "undefined"
        ) {
            return true;
        } else {
            return false;
        }
    }
});
