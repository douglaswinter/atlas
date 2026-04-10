import { DiamondTheme, ThemeProvider } from "@diamondlightsource/sci-react-ui";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { StrictMode, useEffect, useState } from "react";

import { Layout } from "./routes/Layout.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Robot from "./routes/Robot.tsx";
import { InstrumentSessionProvider } from "./context/instrumentSession/InstrumentSessionProvider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type CsWebLibConfig, store } from "@diamondlightsource/cs-web-lib";
import { Provider } from "react-redux";

declare global {
  interface Window {
    global?: typeof globalThis;
  }
}

import { createApi } from "@atlas/blueapi";
import { BlueapiProvider } from "@atlas/blueapi-query";
import { loadPvwsConfig } from "@atlas/pvws-config";
import { Store } from "@mui/icons-material";
import { UserAuthProvider } from "./context/userAuth/UserAuthProvider.tsx";

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import("./mocks/browser");
    return worker.start();
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "robot",
        element: <Robot />,
      },
    ],
  },
]);

const api = createApi("/api");
const queryClient = new QueryClient();

function App() {
  const [config, setConfig] = useState<CsWebLibConfig>();
  useEffect(() => {
    loadPvwsConfig().then((config) => {
      setConfig(config);
    });
  }, []);

  return (
    <Provider store={store(config)}>
      <QueryClientProvider client={queryClient}>
        <UserAuthProvider>
          <BlueapiProvider api={api}>
            <RouterProvider router={router} />
          </BlueapiProvider>
        </UserAuthProvider>
      </QueryClientProvider>
    </Provider>
  );
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <InstrumentSessionProvider>
      <StrictMode>
        <ThemeProvider theme={DiamondTheme} defaultMode="light">
          <App />
        </ThemeProvider>
      </StrictMode>
    </InstrumentSessionProvider>,
  );
});
