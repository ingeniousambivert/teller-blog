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
            zIndex: {
                "-999": "-999",
                999: "999"
            },
            margin: {
                21: "5.25rem",
                22: "5.50rem",
                23: "5.75rem",
                26: "6.50rem",
                27: "6.75rem",
                30: "8.25rem",
                31: "8.50rem"
            },
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
                66: "16.25rem",
                68: "16.5rem",
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
