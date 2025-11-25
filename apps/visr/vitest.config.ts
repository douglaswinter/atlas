import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Use jsdom so RTL can render components
    environment: "jsdom",
    // So no need to import describe/it/expect in every test
    globals: true,
    // Load our jest-dom matchers and any polyfills
    setupFiles: ["./vitest.setup.ts"],
    // Optional: make test discovery explicit
    include: ["**/*.test.{ts,tsx}"],
    // Recommended for React/JSX source maps
    css: false,
    // Nice reporter output
    reporters: ["verbose"],
  },
});
