import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/common/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      primary:"#6354EF",
      secondary:"#2DEACA",
      background:"#F3F3F3",
      warning:"#FE9D00",
      error:"#FD2E2F",

    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/line-clamp")],

};
export default config;
