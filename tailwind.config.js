/** @type {import('tailwindcss').Config} */
import { buttonShadow } from "./src/common/colors.js";
const withMT = require("@material-tailwind/react/utils/withMT.js");
module.exports = withMT({
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      "max-sm": { max: "540px" },
      sm: "540px",
      md: "720px",
      lg: "960px",
      "lg-max": { max: "960px" },
      xl: "1140px",
      "2xl": "1320px",
    },
    colors: {
      app: {
        primary: "#3c5cff",
        secondary: "#e73b7b",
        accent: "#3ade87",
        addition: "#f6cf45",
        lightPrimary: "#8B9EFF",
        lightSecondary: "#EC81A9",
        lightAccent: "#88ebb7",
        lightAddition: "#fae28f",
        footerBackground: "#5D74EE",
        primaryBackground: "#ecefff",

        // text
        text: "#21272A",
      },
    },
    fontFamily: {
      sans: ["var(--font-inter)"],
    },
    boxShadow: {
      primary: buttonShadow.primary,
      secondary: buttonShadow.secondary,
      addition: buttonShadow.addition,
    },
    backgroundImage: (theme) => ({
      "gradient-primary": `linear-gradient(to top, ${theme(
        "colors.app.primary"
      )}, ${theme("colors.app.lightPrimary")})`,
      "gradient-secondary": `linear-gradient(to top, ${theme(
        "colors.app.secondary"
      )}, ${theme("colors.app.lightSecondary")})`,
      "gradient-accent": `linear-gradient(to top, ${theme(
        "colors.app.accent"
      )}, ${theme("colors.app.lightAccent")})`,
      "gradient-addition": `linear-gradient(to top, ${theme(
        "colors.app.addition"
      )}, ${theme("colors.app.lightAddition")})`,
      "gradient-primary-to-right": `linear-gradient(to right,#657DFD, #9FADF4)`,
      "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    }),
  },
  plugins: [require("flowbite/plugin.js")],
});