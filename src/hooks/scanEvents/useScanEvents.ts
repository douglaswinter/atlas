import { useEffect, useState } from "react";
import { scanEventSource } from "./scanEventSource";
import type { ScanEventMessage } from "./types";

export function useScanEvents() {
  const [scanEvent, setScanEvent] = useState<ScanEventMessage | null>(null);

  useEffect(() => {
    const unsubscribe = scanEventSource.subscribe(setScanEvent);
    return unsubscribe;
  }, []);

  return scanEvent;
}
