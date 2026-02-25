import type { Api } from "@atlas/blueapi";
import { renderHook } from "@atlas/vitest-conf";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlueapiProvider } from "./provider";

/**
 * Utility to create isolated QueryClient per test
 */
export function createTestQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
}

/**
 * Utility to render hook with Api + QueryClient providers.
 */
export function renderWithProviders<T>(
  hook: () => T,
  apiMock: Api,
  queryClient: QueryClient,
) {
  return renderHook(hook, {
    wrapper: ({ children }) => (
      <BlueapiProvider api={apiMock}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </BlueapiProvider>
    ),
  });
}
