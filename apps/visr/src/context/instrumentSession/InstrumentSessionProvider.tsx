import { useState, useEffect, type ReactNode } from "react";
import { InstrumentSessionContext } from "./InstrumentSessionContext";

const STORAGE_KEY = "instrument-session-id";

export const InstrumentSessionProvider = ({
  children,
  defaultSessionId = "cm40661-6",
}: {
  children: ReactNode;
  defaultSessionId?: string;
}) => {
  const [instrumentSession, setInstrumentSession] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEY) ?? defaultSessionId;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, instrumentSession);
  }, [instrumentSession]);

  return (
    <InstrumentSessionContext.Provider
      value={{ instrumentSession, setInstrumentSession }}
    >
      {children}
    </InstrumentSessionContext.Provider>
  );
};
