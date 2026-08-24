import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#12121A",
        paper: "#FAF9F4",
        paperdim: "#F1EFE6",
        signal: "#FF4E1F",
        signaldim: "#FFE3D6",
        volt: "#2A3EFF",
        lime: "#D7FF4A",
        line: "#E4E1D3",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        hero: ["var(--font-hero)", "serif"],
        nav: ["var(--font-nav)", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
      },
      keyframes: {
        pulse1: {
          "0%": { transform: "scale(0.8)", opacity: "0.9" },
          "100%": { transform: "scale(2.6)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        pulse1: "pulse1 3.2s cubic-bezier(0.2,0.6,0.4,1) infinite",
        marquee: "marquee 28s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
