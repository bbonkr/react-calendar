import { FlatCompat } from "@eslint/eslintrc";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const compat = new FlatCompat({ baseDirectory: import.meta.url, recommendedConfig: true });

export default [
  // Base ESLint recommended rules & Prettier integration
  ...compat.extends("eslint:recommended", "plugin:prettier/recommended"),

  // Ignore built output and dependencies
  {
    ignores: ["dist/**", "node_modules/**"],
  },

  // CommonJS & browser environment for JS files
  {
    languageOptions: {
      parser: require("@babel/eslint-parser"),
      parserOptions: { ecmaFeatures: { jsx: false }, ecmaVersion: 12, sourceType: "module" },
    },
  },

  // TypeScript & React overrides for .ts/.tsx files
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: { ecmaFeatures: { jsx: true }, ecmaVersion: 12, sourceType: "module" },
    },
    plugins: {
      react: require("eslint-plugin-react"),
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
    },
    settings: { react: { version: "detect" } },
    rules: {
      "react/prop-types": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["error", { varsIgnorePattern: "^_", args: "none" }],
      "no-constant-condition": "off",
    },
  },
];
