/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "black-100": "#2B2C35",
        "primary-millet": {
          DEFAULT: "#E6D3B6",
          100: "#fcfbf8",
          200: "#f2e0c4",
        },
        "primary-wheat": "#EAD2AC",
        "light-white": {
          DEFAULT: "rgba(59,60,152,0.03)",
          100: "rgba(59,60,152,0.02)",
        },
        "primary-brown": "#7C5548",
        "primary-sand": "#DFCAC2",
        "primary-coral": {
          DEFAULT: "#DF928E",
          100: "#fcf4f4",
          200: "#f9e9e8",
        },
        "primary-rose": "#C58882",
        grey: "#747A88",
      },
      backgroundImage: {
        pattern: "url('/pattern.png')",
        "hero-bg": "url('/hero-bg.svg')",

      },
    },
  },
  plugins: [],
};
