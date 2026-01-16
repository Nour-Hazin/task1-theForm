import js from "@eslint/js";
import react from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,jsx}"],
    plugins: {
      react,
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // هذه ستصلح خطأ "Unexpected token <"
        },
      },
      globals: {
        window: "readonly",
      },
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-undef": "error", // هذه ستظهر خط Layout الأحمر
    },
  },
];
