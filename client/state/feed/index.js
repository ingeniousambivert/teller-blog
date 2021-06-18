import { atom } from "recoil";

export const feedState = atom({
    key: "feedState",
    default: [
        {
            id: 1,
            cover: "https://images.unsplash.com/photo-1564069114553-7215e1ff1890?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=889&q=80",
            category: "Technology",
            author: "Technology",
            title: "Finding customers for your new business Finding customers for your new business Finding customers for your new business",
            content:
                "Finding customers for your new business Finding customers for your new business Finding customers for your new business",
            createdAt: "May 20, 2021"
        }
    ]
});
