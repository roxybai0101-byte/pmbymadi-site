import type { Config } from "tailwindcss";
import sharedConfig from "@pmby/config/tailwind";

const config: Config = {
  ...sharedConfig,
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    ...(sharedConfig.theme ?? {}),
    extend: {
      ...(sharedConfig.theme?.extend ?? {}),
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at top left, rgba(200, 169, 106, 0.32), transparent 55%), radial-gradient(circle at center, rgba(243, 233, 228, 0.7), transparent 65%)"
      }
    }
  },
  plugins: [...(sharedConfig.plugins ?? [])]
};

export default config;
