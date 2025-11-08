const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        brand: {
          powder: "#F3E9E4",
          beige: "#EAD8C8",
          cocoa: "#6B4F4F",
          chocolate: "#2B1F1F",
          gold: "#C8A96A"
        }
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        serif: ["Playfair Display", "Cormorant", ...fontFamily.serif]
      },
      borderRadius: {
        "3xl": "1.5rem"
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(107, 79, 79, 0.3)"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};
