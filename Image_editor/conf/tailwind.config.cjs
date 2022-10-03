/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'max': '600px'},
    },
    extend: {
      width: {'128': '53rem'}
    },
  },
  plugins: [],
}