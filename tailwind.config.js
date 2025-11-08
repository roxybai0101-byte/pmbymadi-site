/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./pages/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#fdf9f3",
          100: "#f6ebdd",
          200: "#ecd9c1",
          300: "#dfc1a1",
          400: "#c9a581",
          500: "#b38b66",
          600: "#997454",
          700: "#7c5a44",
          800: "#654838",
          900: "#533c30"
        },
        ink: "#1f1b18",
        ivory: "#faf6f0"
      },
      fontFamily: {
        serif: ["var(--font-serif)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"]
      },
      boxShadow: {
        soft: "0 20px 45px rgba(31, 27, 24, 0.08)",
        glow: "0 15px 35px rgba(201, 165, 129, 0.25)"
      },
      borderRadius: {
        xl: "1.5rem"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(24px)" },
          "100%": { opacity: 1, transform: "translateY(0)" }
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        "fade-in": "fade-in 0.6s ease-out forwards"
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(245, 232, 213, 0.9), transparent 55%), radial-gradient(circle at bottom right, rgba(222, 193, 158, 0.65), transparent 50%)"
      }
    }
  },
  plugins: []
};
