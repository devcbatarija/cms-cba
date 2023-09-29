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
        '120':'32rem'
      }
    },
  },
  plugins: [],
}

