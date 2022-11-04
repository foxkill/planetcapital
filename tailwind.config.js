/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
    // screens: {
    //   sm: "480px",
    //   md: "768px",
    //   lg: "976px",
    //   xl: "1440px"
    // },
        screens: {
            xs: "480px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px"
        },

        extend: {
            gridTemplateColumns: {
                "child-size-lg": "repeat(4, minmax(15rem, 15rem))",
                "child-size-md": "repeat(3, minmax(15rem, 15rem))",
                "child-size-sm": "repeat(2, minmax(15rem, 15rem))",
                "child-size-xs": "repeat(1, minmax(15rem, 15rem))",
            },
            fontFamily: {
                montserrat: ["Montserrat", "sans-serif"],
            },
            colors: {
                "search-field": "#f1f2f3",
                primary: "#ff0043",
                light: "#999",
            },
        },
    },
    plugins: [require("daisyui")],
}