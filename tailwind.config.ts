import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./mdx-components.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#0066ff",
      },
    },
  },
};
export default config;
