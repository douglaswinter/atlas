import { DiamondTheme, ThemeProvider } from "@diamondlightsource/sci-react-ui";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Dashboard from "./routes/Dashboard.tsx";
import { Layout } from "./routes/Layout.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={DiamondTheme} defaultMode="system">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
