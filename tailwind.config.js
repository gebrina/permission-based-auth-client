//** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["selector", '[theme-mode="dark"]'],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        slide_to_left: {
          "0%": {
            transform: "translateX(150%)",
            opacity: 0,
          },
          "20%": {
            transform: "translateX(100%)",
            opacity: 0.2,
          },
          "50%": {
            transform: "translateX(50%)",
            opacity: 0.5,
          },
          "80%": {
            transform: "translateX(30%)",
            opacity: 0.7,
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: 1,
          },
        },
      },
      animation: {
        "slide-left": "slide_to_left 0.2s linear",
      },
    },
  },
  plugins: [],
};
