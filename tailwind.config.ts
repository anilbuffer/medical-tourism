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
          DEFAULT: "#0b5d63",
          light: "#0e757c",
          dark: "#073f43",
          deep: "#04272a",
          hover: "#084e53",
          50: "#f0f8f9",
          100: "#dbeff0",
          200: "#bde0e3",
          500: "#0b5d63",
          600: "#094f54",
          700: "#073f43",
        },
        secondary: {
          DEFAULT: "#e39b2d",
          1: "#e39b2d",
          2: "#a35f0b",
          light: "#fef7ec",
          hover: "#f0a73b",
        },
        secondary1: {
          DEFAULT: "#e39b2d",
          hover: "#f0a73b",
          light: "#fef7ec",
          dark: "#c7821e",
        },
        secondary2: {
          DEFAULT: "#a35f0b",
          hover: "#894e07",
          light: "#fdf5eb",
        },
        vedara: {
          // Deep Primary (#0b5d63 & shades)
          deep: "#04272a",
          dark: "#073f43",
          slate: "#0b5d63",
          midnight: "#073f43",
          navy: "#0b5d63",

          // Gold CTA & Accents (#e39b2d / #a35f0b)
          gold: {
            DEFAULT: "#e39b2d",
            hover: "#f0a73b",
            muted: "#a35f0b",
            light: "#fef7ec",
          },

          // Primary Teal Tone (#0b5d63)
          blue: {
            DEFAULT: "#0b5d63",
            light: "#0e757c",
            dark: "#073f43",
            50:  "#f0f8f9",
            100: "#dbeff0",
            200: "#bde0e3",
            500: "#0b5d63",
            600: "#094f54",
            700: "#073f43",
            900: "#04272a",
          },

          // Teal / Cyan Accent
          cyan: {
            DEFAULT: "#0b5d63",
            light: "#14909a",
            dark: "#073f43",
            mid1: "#0b5d63",
            mid2: "#0e757c",
          },

          cream: "#f8fafb",
          platinum: "#eef4f5",
          surface: "#FFFFFF",
          muted: "#5c7376",
          offwhite: "#f8fafb",
          "tint-blue": "#f0f8f9",
          "tint-red": "#fff8f8",
        },
        dark: {
          1: "#04272a",
          2: "#073f43",
          3: "#0b5d63",
          4: "#021618",
          5: "#052d30",
          step: "#0e757c",
        },
        whatsapp: "#25D366",
        portal: {
          green: "#0b5d63",
          "green-hover": "#073f43",
          navy: "#04272a",
        },
      },
      fontFamily: {
        sans: ["var(--font-body)", "Roboto", "system-ui", "sans-serif"],
        serif: ["var(--font-heading)", "Jost", "sans-serif"],
        heading: ["var(--font-heading)", "Jost", "sans-serif"],
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
