import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  AuthProvider,
  ThemeProvider,
  DiamondDSTheme,
  useAuth,
  User,
} from "@diamondlightsource/sci-react-ui";

const keycloakConfig = {
  url: "https://identity-test.diamond.ac.uk",
  realm: "dls",
  clientId: "douglas-test",
};

function UserButton() {
  const auth = useAuth();
  return <User auth={auth} />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider keycloakConfig={keycloakConfig}>
      <ThemeProvider theme={DiamondDSTheme}>
        <UserButton />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
);
