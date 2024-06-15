import type { Config } from "tailwindcss";

const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"));
  const newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val]),
  );

  addBase({
    ":root": newVars,
  });
}

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./node_modules/flowbite/**/*.js"],
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6354EF",
          "50": "#eef0ff",
          "100": "#e0e3ff",
          "200": "#c7ccfe",
          "300": "#a5aafc",
          "400": "#8481f8",
          "500": "#6354ef",
          "600": "#6347e4",
          "700": "#5439c9",
          "800": "#4530a3",
          "900": "#3b2e81",
          "950": "#241b4b",
        },
        secondary: {
          DEFAULT: "#2DEACA",
          "50": "#eefffa",
          "100": "#c6fff2",
          "200": "#8effe6",
          "300": "#4dfbd7",
          "400": "#2deaca",
          "500": "#00ccac",
          "600": "#00a48e",
          "700": "#038272",
          "800": "#08675d",
          "900": "#0c554d",
          "950": "#003431",
        },
        background: {
          DEFAULT: "#F3F3F3",
          "50": "#f8f8f8",
          "100": "#f3f3f3",
          "200": "#dcdcdc",
          "300": "#bdbdbd",
          "400": "#989898",
          "500": "#7c7c7c",
          "600": "#656565",
          "700": "#525252",
          "800": "#464646",
          "900": "#3d3d3d",
          "950": "#292929",
        },
        warning: {
          DEFAULT: "#FE9D00",
          "50": "#fffcea",
          "100": "#fff3c5",
          "200": "#ffe885",
          "300": "#ffd546",
          "400": "#ffc11b",
          "500": "#fe9d00",
          "600": "#e27600",
          "700": "#bb5002",
          "800": "#983e08",
          "900": "#7c330b",
          "950": "#481800",
        },
        error: "#FD2E2F",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    addVariablesForColors,
  ],
};
export default config;
