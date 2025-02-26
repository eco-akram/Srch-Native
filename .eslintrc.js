/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended", // ESLint's base recommended rules
    "plugin:import/recommended", // Import plugin recommended rules
    "plugin:prettier/recommended", // Prettier plugin to integrate with ESLint
  ],
  parserOptions: {
    ecmaVersion: 2020, // Allow parsing of ES6+ syntax
    sourceType: "module", // Allow imports
  },
  plugins: ["import"], // Use the import plugin to enforce the order
  rules: {
    "import/order": [
      "error",
      {
        groups: [
          ["builtin", "external"], // External libraries first
          ["internal", "parent", "sibling", "index"], // Internal imports later
        ],
        alphabetize: {
          order: "asc", // Enforce alphabetical sorting
          caseInsensitive: true, // Sort case insensitively
        },
      },
    ],
    "prettier/prettier": [
      "error",
      {
        endOfLine: "lf", // Enforce LF line endings
      },
    ],
  },
};
