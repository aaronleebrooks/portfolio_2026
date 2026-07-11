import js from "@eslint/js";
import testingLibrary from "eslint-plugin-testing-library";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.test.{ts,tsx}"],
    ...testingLibrary.configs["flat/react"],
  },
  {
    files: ["src/**/*.test.{ts,tsx}"],
    rules: {
      "testing-library/no-node-access": "error",
      "testing-library/no-container": "error",
      "testing-library/prefer-screen-queries": "error",
      "testing-library/no-debugging-utils": "error",
    },
  },
);
