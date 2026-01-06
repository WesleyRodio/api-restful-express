import eslintConfig from "@wesleydevrodio/eslint-config/api";

export default [
  ...eslintConfig,
  {
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
    }
  }
];
