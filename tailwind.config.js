/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        'venezuela': {
          'yellow': '#FFCC00',
          'blue': '#00247D',
          'red': '#CF142B',
          'white': '#FFFFFF',
        },
      },
    },
  },
  plugins: [],
}
