import type { Api } from "@atlas/blueapi";
import { AuthProvider, ThemeProvider } from "@diamondlightsource/sci-react-ui";
import type { Theme } from "@mui/material";
import type { ReactNode } from "react";
import { InstrumentSessionProvider } from "./context/instrumentSession/InstrumentSessionProvider";
import { Provider as ReduxProvider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BlueapiProvider } from "@atlas/blueapi-query";
import { store } from "@diamondlightsource/cs-web-lib";
import { useLoadPvwsConfig } from "@atlas/pvws-config";
import { UserAuthProvider } from "./context/userAuth/UserAuthProvider";
import { ApolloProvider } from "@apollo/client/react";
import { client } from "./context/experimentDefinitions/apolloClient";

type Props = {
  api: Api;
  theme: Theme;
  children: ReactNode;
};

const tokenItemName = "KEYCLOAK.TOKEN";

export function updateTokenStore(token: string) {
  sessionStorage.setItem(tokenItemName, token);
}
export function readTokenStore(): string {
  return sessionStorage.getItem(tokenItemName) ?? "";
}

const CastThemeProvider = ThemeProvider as React.ComponentType<
  React.PropsWithChildren<{
    theme?: any;
    defaultMode?: string;
  }>
>;

export function AppProviders({ api, theme, children }: Props) {
  const config = useLoadPvwsConfig();

  const keycloakConfig = {
    url: "https://identity-test.diamond.ac.uk",
    realm: "dls",
    clientId: "douglas-test",
  };

  return (
    <AuthProvider
      keycloakConfig={keycloakConfig}
      keycloakInitOptions={{
        silentCheckSsoRedirectUri: `${location.origin}/auth/silent-check-sso.html`,
      }}
      onTokenChange={updateTokenStore}
    >
      <CastThemeProvider theme={theme}>
        <InstrumentSessionProvider>
          <ReduxProvider store={store(config)}>
            <QueryClientProvider client={new QueryClient()}>
              <UserAuthProvider>
                <BlueapiProvider api={api}>
                  <ApolloProvider client={client}>{children}</ApolloProvider>
                </BlueapiProvider>
              </UserAuthProvider>
            </QueryClientProvider>
          </ReduxProvider>
        </InstrumentSessionProvider>
      </CastThemeProvider>
    </AuthProvider>
  );
}
