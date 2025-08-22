import js from "@eslint/js";
import globals from "globals";
import json from "@eslint/json";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // JavaScript files
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node, // Node.js globals
      ecmaVersion: "latest", // allow modern JS syntax
      sourceType: "module",  // since you're using import/export
    },
    plugins: { js },
    extends: ["js/recommended"],
    rules: {
      // optional: enforce prettier style or stricter rules
      "no-console": "off", // CLI app, console is fine
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }], // ignore unused args starting with _
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