/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        bungee: ['bungee', 'cursive'],
        pacifico: ['pacifico', 'cursive'],
        whocats: ['whocats', 'cursive'],
        valentine_cute: ['valentine-cute', 'cursive'],
        lora: ['lora', 'cursive'],
      }
    },
  },
  plugins: [],
}

