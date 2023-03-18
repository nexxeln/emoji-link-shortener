/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      dark: "#1c1c1c",
      primary: "#e5e5e5",
      secondary: "#a0a0a0",
    },
  },
  plugins: [],
};
