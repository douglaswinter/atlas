import { useEffect, useRef, useState } from "react";
import { type NDT } from "@diamondlightsource/davidia";

export type RGBColour = "red" | "green" | "blue" | "gray";

export type FetchMapFunction = (
  filepath: string,
  datapath: string,
  colour: RGBColour,
) => Promise<NDT>;

export interface DataChannels {
  red: NDT | null;
  green: NDT | null;
  blue: NDT | null;
}

export interface ScanEventMessage {
  status: "running" | "finished" | "failed";
  filepath: string;
  uuid: string;
}

export function useSpectroscopyData(fetchMap: FetchMapFunction) {
  const [running, setRunning] = useState<boolean>(false);
  const [filepath, setFilepath] = useState<string | null>(null);
  const [data, setData] = useState<DataChannels>({
    red: null,
    green: null,
    blue: null,
  });

  /** Cached interval id */
  const pollInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  // Subscribe to SSE
  useEffect(() => {
    const evtSource = new EventSource("/api/data/events");

    evtSource.onmessage = event => {
      try {
        const msg = JSON.parse(event.data) as ScanEventMessage;
        console.log("SSE message:", msg);

        if (msg.status === "running") {
          setRunning(true);
          setFilepath(msg.filepath);
        } else if (msg.status === "finished" || msg.status === "failed") {
          setRunning(false); // triggers final poll below
        }
      } catch (err) {
        console.error("Error parsing SSE:", err);
      }
    };

    evtSource.onerror = err => {
      console.warn("Temporary SSE connection error:", err);
    };

    evtSource.onopen = () => {
      console.log("SSE connection opened or re-established");
    };

    return () => evtSource.close();
  }, []);

  // Poll during scan + once more afterwards
  useEffect(() => {
    async function poll() {
      if (!filepath) return;
      try {
        const basePath = "/entry/instrument/spectroscopy_detector/";
        const [red, green, blue] = await Promise.all([
          fetchMap(filepath, basePath + "RedTotal", "red"),
          fetchMap(filepath, basePath + "GreenTotal", "green"),
          fetchMap(filepath, basePath + "BlueTotal", "blue"),
        ]);
        setData({ red, green, blue });
      } catch (err) {
        console.error("Polling error:", err);
      }
    }

    if (running && filepath) {
      // start polling
      pollInterval.current = setInterval(poll, 500); // 2 Hz
    } else if (!running && pollInterval.current) {
      // poll once more then clear interval
      poll().finally(() => {
        clearInterval(pollInterval.current!);
        pollInterval.current = null;
      });
    }

    return () => {
      if (pollInterval.current) {
        clearInterval(pollInterval.current);
        pollInterval.current = null;
      }
    };
  }, [running, filepath, fetchMap]);

  return { data, running };
}
