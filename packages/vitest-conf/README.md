# @atlas/vitest-conf

Shared Vitest configuration and test environment for the **Atlas** monorepo.

This package centralises all testing setup — including Vitest configuration, jsdom environment, and Testing Library matchers — so that individual apps and packages can keep their own configs minimal and consistent.

## Features

- Shared **Vitest** configuration via `vitest.config.ts`
- Preconfigured **jsdom** environment for React component testing
- Includes **@testing-library/jest-dom** matchers globally
- TypeScript definitions for `expect`, `describe`, etc.
- Central place to update dependencies like `@testing-library/*`

## Usage

1.  Add `vitest` and `@atlas/vitest-conf` as dev dependencies:

```bash
pnpm add -D -F @atlas/myapp @atlas/vitest-conf --workspace
pnpm add -D -F @atlas/myapp vitest
```

2.  Create a `vitest.config.ts` that simply reuses the shared base config:

```ts
// apps/myapp/vitest.config.ts
import { defineConfig } from "vitest/config";
import baseConfig from "@atlas/vitest-conf/vitest.config";

export default defineConfig({
  ...baseConfig,
});
```

3.  Include global type definitions in `apps/my-app/tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@atlas/vitest-conf/global-types"]
  }
}
```

4. Write some tests! Vitest will find tests that match `**/*.test.{ts,tsx}`.

5. Add test and coverage Vitest scripts to your `package.json`. Turbo will run them if you call them 'test' and 'coverage':

```json
{
  "scripts": {
    "test": "vitest run",
    "coverage": "vitest run --coverage"
  }
}
```

## Coverage

Should _everything_ be covered by unit tests? `@atlas/vitest-conf` doesn't think so, and so makes some opinionated and generic exclusions for producing coverage reports. If your app needs to add to these, use `mergeConfig` in your app's `vitest.config.ts`.

Example:

```typescript
// apps/myapp/vitest.config.ts
import { defineConfig, mergeConfig } from "vitest/config";
import baseConfig from "@atlas/vitest-conf/vitest.config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: ["../RelayEnvironment.ts", "**/AppProviders.tsx"],
      },
    },
  }),
);
```

If it is not a logic-bearing module, it may be OK for exclusion. Use your discretion.
