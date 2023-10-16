/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '118': '28rem',
        '120': '32rem',
        '80vh': '80vh',
        '30': '123px'
      },
      width: {
        '86%': '86%'
      },
      colors: {
        'cbaBlue': '#002E5F',
        'cbaRed': '#D50032',
        'azulClaro': '#1976D2'
      }
    },
  },
  plugins: [],
}

