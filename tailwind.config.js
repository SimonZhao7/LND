/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#222222',
        'space-gray': '#474646',
        'light-gray': '#D2D2D2',
        'highlight': '#8E5DF6',
        'highlight-dark': '#653FB8',
      }
    },
  },
  plugins: [],
}
