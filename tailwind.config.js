module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': '#002D46',
        'primary-yellow': '#FFCC33',
      },
      fontFamily: {
        coconat: ["Coconat-Regular", "Coconat-Bold"],
        gotham: ["Gotham"],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
