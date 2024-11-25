import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#007bff",
        secondary: "#f1c40f",
        danger: "#e74c3c",
        "dark-slate-blue": "#30338E",
        supernova: "#FFC700",
        "artyClick-deep-dky-blue": "#0C84FB",
        "nile-blue": "#123456",
        zucchini: "#0C4523",
        monsoon: "#888888",
        "davy-grey": "#555555",
        "rubber-ducky-yellow": "#FDD600",
        "milk-chocolate": "#804E21",
        "sepia-skin": "#956134",
        "french-beige": "#A67A55",
        "solid-pink": "#89243D",
        "artyClick-cool-magenta": "#BB00FF",
        brownish: "#A06D4D",
        earth: "#A16B48",
        "muted-blue": "#386E9E",
        "deep-sea-blue": "#005189",
        "light-aqua": "#9BF7FF",
        "smoky-grey": "#747474",
        "rose-wood": "#670506",
        "dark-rose-wood": "#660505",
        aureolin: "#FDEE00",
        "flora-white": "#FFFAF3",
        boulder: "#747775",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      fontFamily: {
        sans: ["Inter", "Arial", "sans-serif"],
        octosquare: ["octosquare", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
