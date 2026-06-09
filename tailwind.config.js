/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#C9A84C",
          light: "#E8D08A",
          dark: "#8A6F33",
        },
        black: "#030303",
        dark: "#0A0A0A",
        panel: "#0F0F0F",
        white: {
          DEFAULT: "#F5F2EC",
          soft: "rgba(245,242,236,0.55)",
          dim: "rgba(245,242,236,0.22)",
        },
        border: "rgba(201,168,76,0.15)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      letterSpacing: {
        eyebrow: "0.4em",
        nav: "0.28em",
      },
    },
  },
  plugins: [],
};
