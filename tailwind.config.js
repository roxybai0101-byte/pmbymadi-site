/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
    "./content/**/*.{md,mdx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      colors: {
        brand: {
          powder: "#F3E9E4",
          warm: "#EAD8C8",
          cocoa: "#6B4F4F",
          chocolate: "#2B1F1F",
          gold: "#C8A96A",
          white: "#FFFFFF"
        },
        background: "#FDF9F6",
        foreground: "#2B1F1F",
        border: "#EAD8C8",
        muted: {
          DEFAULT: "#F3E9E4",
          foreground: "#6B4F4F"
        },
        accent: {
          DEFAULT: "#EAD8C8",
          foreground: "#2B1F1F"
        },
        ring: "#C8A96A"
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem",
        xl: "1.25rem"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
        serif: ["var(--font-serif)", "Playfair Display", "serif"]
      },
      boxShadow: {
        ambient: "0 24px 80px rgba(43, 31, 31, 0.12)",
        soft: "0 10px 30px rgba(107, 79, 79, 0.12)",
        subtle: "0 6px 24px rgba(200, 169, 106, 0.18)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(16px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.45s ease-out forwards",
        shimmer: "shimmer 2s linear infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
