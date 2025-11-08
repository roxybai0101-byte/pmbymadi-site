/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:prettier/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"]
      },
      typescript: {
        project: path.resolve(__dirname, "../../tsconfig.base.json")
      }
    },
    tailwindcss: {
      callees: ["cn"],
      config: "tailwind.config.ts"
    }
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
    ],
    "tailwindcss/classnames-order": "off"
  },
  ignorePatterns: [
    "node_modules/",
    ".next/",
    "dist/",
    "out/",
    "*.config.js",
    "*.config.cjs",
    "*.config.mjs"
  ]
};
