/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  extends: ["next/core-web-vitals", "next/typescript"],
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    "react/jsx-sort-props": [
      "warn",
      {
        callbacksLast: true,
        shorthandFirst: true
      }
    ],
    "@next/next/no-img-element": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports"
      }
    ]
  }
};

module.exports = config;
