/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        blu: "#266CDB",
        rosso: "#E22323",
      },
      fontFamily: {
        sans: ["Jost", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
