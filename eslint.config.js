import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript / ES module files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,  // Node.js globals like process, console
      ecmaVersion: "latest",  // allow modern JS syntax
      sourceType: "module",   // import/export
    },
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-console": "off",  // console is fine for CLI
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // allow _args for ignored params
      "semi": ["error", "always"],  // enforce semicolons
      "quotes": ["error", "double"], // enforce double quotes
      "indent": ["error", 2],        // 2-space indentation
      "no-redeclare": "error",
      "no-undef": "error",
    },
  },

  // JSON files
  {
    files: ["**/*.json"],
    plugins: { json },
    language: "json/json",
    extends: ["json/recommended"],
  },
]);