import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "@atlas/vitest-conf/vitest.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: ["**/RelayEnvironment.ts"],
      },
    },
  }),
);
