/* eslint-disable global-require */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6F3284',
        'primary-bright': '#6F3284',
        'shadow-color': '#6F3284',
        'light-purple': '#F487D2',
      },
      fontSize: {
        'body-lg': '1rem',
        body: '.875rem',
      },
      fontFamily: {
        lora: "'lora',serif",
      },
    },
  },
  plugins: [],
};
