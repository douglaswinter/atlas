import { defineConfig } from "vitest/config";
import baseConfig from "@atlas/vitest-conf/vitest.config";

export default defineConfig({
  ...baseConfig,
  define: {
    "import.meta.env.VITE_PROFILER_ENABLED": JSON.stringify("false"),
  },
});
