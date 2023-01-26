/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'xs': '380px'
      },
      colors: {
        'main-color': '#A533FF',
        'main-color-dark': '#8F00FF',
        'main-color-light': '#BC66FF',
        'in-progress': '#3385FF',
        'completed': '#99FF9C',
        'delete': '#FF0000',
        'gray': '#D9D9D9'
      },
    }
  },
  plugins: [],
};
