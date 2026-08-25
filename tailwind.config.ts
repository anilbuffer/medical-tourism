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
          // Deep Navy — darkest base (#283593)
          dark: "#1a2468",
          slate: "#283593",
          midnight: "#2f3ea8",
          navy: "#3547ba",

          // Indigo Primary — mid tone (#3F4EB4)
          blue: {
            DEFAULT: "#3F4EB4",
            light: "#5062CC",
            dark: "#283593",
            50:  "#ECEEF9",
            100: "#C8CCEF",
            200: "#9BA3E2",
            500: "#5062CC",
            600: "#3F4EB4",
            700: "#283593",
            900: "#141C55",
          },

          // Teal / Turquoise accent (#2ECDC5)
          cyan: {
            DEFAULT: "#2ECDC5",
            light: "#5ADBD5",
            dark: "#1DA89F",
          },

          cream: "#F5F7FF",
          platinum: "#EEF0FA",
          surface: "#FFFFFF",
          muted: "#6B7DB3",
        },
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
      },
      boxShadow: {
        "luxury":       "0 20px 40px -15px rgba(63, 78, 180, 0.12), 0 0 25px -5px rgba(40, 53, 147, 0.08)",
        "luxury-hover": "0 25px 50px -12px rgba(63, 78, 180, 0.25), 0 0 30px -5px rgba(40, 53, 147, 0.15)",
        "card":         "0 4px 20px -2px rgba(63, 78, 180, 0.07), 0 2px 6px -1px rgba(40, 53, 147, 0.04)",
        "glass":        "0 8px 32px 0 rgba(40, 53, 147, 0.10)",
        "glow":         "0 0 30px rgba(46, 205, 197, 0.40)",
        "glow-indigo":  "0 0 30px rgba(63, 78, 180, 0.40)",
      },
      backgroundImage: {
        "gradient-radial":   "radial-gradient(var(--tw-gradient-stops))",
        "radial-highlight":  "radial-gradient(circle at 50% 0%, rgba(63, 78, 180, 0.18), transparent 70%)",
        "luxury-gradient":   "linear-gradient(135deg, #283593 0%, #1a2468 100%)",
        "blue-gradient":     "linear-gradient(135deg, #3F4EB4 0%, #283593 100%)",
        "cyan-gradient":     "linear-gradient(135deg, #2ECDC5 0%, #1DA89F 100%)",
        "hero-gradient":     "linear-gradient(135deg, #1a2468 0%, #283593 40%, #3F4EB4 100%)",
        "accent-gradient":   "linear-gradient(135deg, #2ECDC5 0%, #3F4EB4 100%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-6px)" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%":      { opacity: "0.5" },
        },
        shimmerSlide: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
      animation: {
        float:           "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 3s infinite",
        "pulse-slow":    "pulseSlow 3s ease-in-out infinite",
        shimmer:         "shimmerSlide 2.5s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
