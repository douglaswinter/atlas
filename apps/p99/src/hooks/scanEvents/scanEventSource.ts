/* SSE manager */

import type { ScanEventMessage } from "./types";

type Listener = (msg: ScanEventMessage) => void;

class ScanEventSourceManager {
  private subscription: EventSource | null = null;
  private listeners: Set<Listener> = new Set<Listener>();

  /** Registers the given listener, and returns an unsubscribe function */
  subscribe(listener: Listener) {
    this.listeners.add(listener);

    if (!this.subscription) {
      this.connect();
    }

    return () => {
      this.listeners.delete(listener);

      if (this.listeners.size === 0) {
        this.disconnect();
      }
    };
  }

  private connect() {
    this.subscription = new EventSource("/api/data/events");

    this.subscription.onmessage = event => {
      try {
        const msg = JSON.parse(event.data) as ScanEventMessage;
        console.debug("SSE message: ", msg);
        this.listeners.forEach(fn => fn(msg));
      } catch (err) {
        console.error("Error parsing SSE:", err);
      }
    };

    this.subscription.onerror = err => {
      console.warn("Temporary SSE connection error:", err);
    };

    this.subscription.onopen = () => {
      console.log("SSE connection opened or re-established");
    };
  }

  private disconnect() {
    this.subscription?.close();
    this.subscription = null;
  }
}

export const scanEventSource = new ScanEventSourceManager();
