/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        monster: {
          green: '#00FF00',
          black: '#000000',
          gray: '#1a1a1a',
        },
      },
      fontFamily: {
        monster: ['Impact', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
