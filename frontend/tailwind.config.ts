import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/**/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#6354EF",
        secondary: "#2DEACA",
        background: "#F3F3F3",
        warning: "#FE9D00",
        error: "#FD2E2F",
      },
    },
  },
  // eslint-disable-next-line global-require,import/no-extraneous-dependencies
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],
};
export default config;
