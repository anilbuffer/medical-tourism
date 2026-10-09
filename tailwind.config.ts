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
        primary: {
          DEFAULT: "#0C2338", // Primary — Deep Navy
          light: "#163654",
          dark: "#071624",
          deep: "#0C2338",
          hover: "#102f4a",
          50: "#f2f6fa",
          100: "#e1ecf5",
          200: "#c3d9eb",
          500: "#0C2338",
          600: "#091c2d",
          700: "#071624",
        },
        teal: {
          DEFAULT: "#0B5D68", // Primary Teal
          light: "#0d717e",
          dark: "#084851",
          hover: "#094b54",
          50: "#f0f8f9",
          100: "#dbeff0",
          200: "#bde0e3",
          500: "#0B5D68",
          600: "#094b54",
          700: "#073f43",
        },
        blue: {
          DEFAULT: "#2C7FAF", // Secondary Blue
          light: "#4497c7",
          dark: "#1f6187",
          hover: "#256f99",
          50: "#f0f7fb",
          100: "#dbebf5",
        },
        green: {
          DEFAULT: "#0B8F83", // Accent Green
          light: "#0ea395",
          dark: "#087369",
          50: "#f0faf9",
        },
        accent: {
          DEFAULT: "#F0A126", // Orange Highlight
          hover: "#db8e18",
          light: "#fef7ec",
          dark: "#c7821e",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#ECF4F7", // Soft Blue Background
        },
        background: "#FCFDFD", // Main Background
        text: {
          primary: "#0C2338",
          secondary: "#6B7C88",
        },
        border: {
          DEFAULT: "#DCE6EB",
          subtle: "#DCE6EB",
        },
        secondary: {
          DEFAULT: "#F0A126",
          1: "#F0A126",
          2: "#0B5D68",
          light: "#fef7ec",
          hover: "#db8e18",
        },
        secondary1: {
          DEFAULT: "#F0A126",
          hover: "#db8e18",
          light: "#fef7ec",
          dark: "#c7821e",
        },
        secondary2: {
          DEFAULT: "#0B5D68",
          hover: "#094b54",
          light: "#ECF4F7",
        },
        vedara: {
          deep: "#0C2338",
          dark: "#071624",
          slate: "#0C2338",
          midnight: "#0C2338",
          navy: "#0C2338",
          gold: {
            DEFAULT: "#F0A126",
            hover: "#db8e18",
            muted: "#c7821e",
            light: "#fef7ec",
          },
          blue: {
            DEFAULT: "#2C7FAF",
            light: "#4497c7",
            dark: "#1f6187",
            50:  "#ECF4F7",
            100: "#dbeff0",
            200: "#bde0e3",
            500: "#0B5D68",
            600: "#094b54",
            700: "#0C2338",
            900: "#071624",
          },
          cyan: {
            DEFAULT: "#0B5D68",
            light: "#0ea395",
            dark: "#084851",
            mid1: "#0B5D68",
            mid2: "#2C7FAF",
          },
          cream: "#FCFDFD",
          platinum: "#ECF4F7",
          surface: "#FFFFFF",
          muted: "#6B7C88",
          offwhite: "#FCFDFD",
          "tint-blue": "#ECF4F7",
          "tint-red": "#fff8f8",
        },
        dark: {
          1: "#0C2338",
          2: "#071624",
          3: "#0B5D68",
          4: "#05111c",
          5: "#081a2b",
          step: "#163654",
        },
        whatsapp: "#0B8F83",
        portal: {
          green: "#0B8F83",
          "green-hover": "#087369",
          navy: "#0C2338",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Roboto", "system-ui", "sans-serif"],
        serif: ["var(--font-heading)", "Poppins", "Poppins Fallback", "sans-serif"],
        heading: ["var(--font-heading)", "Poppins", "Poppins Fallback", "sans-serif"],
        body: ["var(--font-body)", "Roboto", "system-ui", "sans-serif"],
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
        "dark-gradient":     "linear-gradient(180deg, #020B18 0%, #06203D 50%, #0A2E50 100%)",
        "dark-gradient-br":  "linear-gradient(135deg, #020B18 0%, #06203D 50%, #0A2E50 100%)",
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
