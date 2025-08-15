import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      backgroundColor: {
        "dracula-card": "var(--bg-dracula-card)",
        "nord-card": "var(--bg-nord-card)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        night: {
          primary: "#4e7dff",
          secondary: "#f6ad55",
          accent: "#7b9acc",
          neutral: "#2a2a2a",
          "base-100": "#1a1a1a",
          "base-300": "#334155",
        },
      },
      "nord",
    ],
  },
};
export default config;
