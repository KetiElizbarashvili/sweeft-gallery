/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    colors: {
      primary: "#01204e",
      secondary: "#028391",
      orange: {
        100: "#f6dcac",
        200: "#faa968",
        300: "#f85525"
      },
      white: "#F2F3F5",
      gray: {
        100: "#D9D9D9",
        200: "#BFBFBF",
        300: "#A6A6A6",
        400: "#8C8C8C",
        500: "#737373",
        600: "#595959",
        700: "#404040",
        800: "#262626",
        900: "#0D0D0D"
      }
    }
  },
  plugins: [],
}

