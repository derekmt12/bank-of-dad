/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "sparkle-pink": "#FF69B4",
        "sunshine-yellow": "#FFD700",
        "sky-blue": "#87CEEB",
        "mint-green": "#98FB98",
        lavender: "#E6E6FA",
        coral: "#FF7F50",
      },
    },
  },
  plugins: [],
};
