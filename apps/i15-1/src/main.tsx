import {
  DiamondTheme,
  useAuth,
  User,
} from "@diamondlightsource/sci-react-ui";
import { RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode, useMemo } from "react";

import { RoutedApp, router } from "./router.tsx";

import { createApi } from "@atlas/blueapi";
import { AppProviders } from "./AppProviders.tsx";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
}

const api = createApi("/api/blueapi");

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <AppProviders api={api} theme={DiamondTheme}>
        <RoutedApp />
      </AppProviders>
    </StrictMode>,
  );
});
