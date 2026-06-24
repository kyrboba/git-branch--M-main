/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f4',
          100: '#d9ebe4',
          200: '#b6d7cc',
          300: '#87bcac',
          400: '#5a9b89',
          500: '#3b7d6c',
          600: '#2d6358',
          700: '#264f47',
          800: '#21403a',
          900: '#1b3632',
          950: '#0f1f1c',
        },
        wood: {
          50: '#faf8f5',
          100: '#f2ebe3',
          200: '#e4d5c6',
          300: '#d4baa2',
          400: '#c29d7a',
          500: '#b38860',
          600: '#a67a55',
          700: '#8a6347',
          800: '#70513e',
          900: '#5b4435',
          950: '#30231a',
        },
        cream: {
          50: '#fefdfb',
          100: '#fcf9f3',
          200: '#f7f1e6',
          300: '#f1e7d6',
          400: '#e9d9c1',
          500: '#e0c9aa',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
