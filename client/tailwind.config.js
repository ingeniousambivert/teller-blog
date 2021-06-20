module.exports = {
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./containers/**/*.{js,ts,jsx,tsx}",
        "./layouts/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        backgroundColor: (theme) => ({
            ...theme("colors"),
            "gray-950": "#111111"
        }),
        extend: {
            minWidth: {
                "11.5/12": "99%"
            },
            width: {
                81: "21rem",
                82: "22rem",
                88: "26rem",
                104: "30rem",
                120: "40rem",
                130: "45rem",
                140: "50rem",
                150: "55rem",
                160: "60rem",
                "11.5/12": "99%",
                "0.5/12": "1%"
            },
            height: {
                92: "22rem"
            },
            animation: {
                bounce200: "bounce 1s infinite 200ms",
                bounce400: "bounce 1s infinite 400ms"
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
