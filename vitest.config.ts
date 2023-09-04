import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    browser: {
      enabled: false,
      name: "",
    },
    include: ["**/*.test.ts"],
  },
  clearScreen: false,
});
