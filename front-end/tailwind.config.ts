import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        yellowNews: "#FFCE04",
        grayNews: "#615A5A",
        brownNews: "#240E0B",
      },
    },
  },
  plugins: [],
};

export default config;
