import React, { createContext, useContext } from "react";
import type { Api } from "@atlas/blueapi";

const BlueapiContext = createContext<Api | null>(null);

export function BlueapiProvider({
  api,
  children,
}: {
  api: Api;
  children: React.ReactNode;
}) {
  return (
    <BlueapiContext.Provider value={api}>{children}</BlueapiContext.Provider>
  );
}

export function useBlueapi() {
  const ctx = useContext(BlueapiContext);
  if (!ctx) {
    throw new Error("useBlueapi must be used inside a BlueapiProvider");
  }
  return ctx;
}
