/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#78350f',
        ui: '#1e293b',
        one: '#047857',
        two: '#fcd34d',
        three: '#b91c1c',
        four: '#7f1d1d',
      },
    },
  },
  plugins: [],
}
