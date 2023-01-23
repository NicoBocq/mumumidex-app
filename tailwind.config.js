/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#1c1917',
        one: '#047857',
        two: '#fcd34d',
        three: '#b91c1c',
        four: '#7f1d1d',
      },
    },
  },
  plugins: [],
};
