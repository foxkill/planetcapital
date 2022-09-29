/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.ts",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px"
    },
    extend: {
      fontFamily: {
          montserrat: [ "Montserrat", "sans-serif" ],
      },
      colors: {
        "search-field": "#f1f2f3",
        primary: '#ff0043',
        light: '#999',
      },
    },
  },
  plugins: [],
}