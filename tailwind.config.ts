import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        vedara: {
          dark: "#061019",
          slate: "#0B192C",
          midnight: "#0F2236",
          navy: "#132D46",
          teal: {
            DEFAULT: "#0D9488",
            light: "#14B8A6",
            dark: "#0F766E",
            50: "#F0FDFA",
            100: "#CCFBF1",
            200: "#99F6E4",
            500: "#14B8A6",
            600: "#0D9488",
            700: "#0F766E",
            900: "#134E4A",
          },
          gold: {
            DEFAULT: "#D97706",
            light: "#F59E0B",
            warm: "#FDE68A",
          },
          cream: "#FBFBFC",
          platinum: "#F3F6F9",
          surface: "#FFFFFF",
          muted: "#64748B",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "Inter", "sans-serif"],
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
      },
      boxShadow: {
        "luxury": "0 20px 40px -15px rgba(13, 148, 136, 0.07), 0 0 25px -5px rgba(11, 25, 44, 0.05)",
        "luxury-hover": "0 25px 50px -12px rgba(13, 148, 136, 0.18), 0 0 30px -5px rgba(11, 25, 44, 0.12)",
        "card": "0 4px 20px -2px rgba(0, 0, 0, 0.05), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        "glass": "0 8px 32px 0 rgba(11, 25, 44, 0.08)",
        "glow": "0 0 30px rgba(20, 184, 166, 0.35)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-highlight": "radial-gradient(circle at 50% 0%, rgba(20, 184, 166, 0.15), transparent 70%)",
        "luxury-gradient": "linear-gradient(135deg, #0B192C 0%, #061019 100%)",
        "emerald-gradient": "linear-gradient(135deg, #0D9488 0%, #064E3B 100%)",
        "gold-gradient": "linear-gradient(135deg, #F59E0B 0%, #B45309 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "pulse-slow": "pulseSlow 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
