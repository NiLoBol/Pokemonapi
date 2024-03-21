/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"], 
  theme: {
    extend: {
        colors: {
          "bug": "#A7B723",
          "dark": "#75574C",
          "dragon": "#7037ff",
          "electric": "#f9cf30",
          "fairy": "#e69eac",
          "fighting": "#C12239",
          "fire": "#F57D31",
          "flying": "#A891EC",
          "ghost": "#70559B",
          "normal": "#AAA67F",
          "grass": "#74CB48",
          "ground": "#DEC16B",
          "ice": "#9AD6DF",
          "poison": "#A43E9E",
          "psychic": "#B69E31",
          "rock": "#FB5584",
          "steel": "#B7B9D0",
          "water": "#6493EB"
        },
    },
  },
  plugins: [],
}

