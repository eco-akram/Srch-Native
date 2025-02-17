/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,tsx}', './components/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primaryBg: 'FFFFFF', // white
        secondaryBg: 'EAEAEA', // gray
        accent: '017AFF', // blue
        main: '18181B', // black
        mainText: '000000', // white
        secondaryText: '919198', // gray
      },
    },
  },
  plugins: [],
};
