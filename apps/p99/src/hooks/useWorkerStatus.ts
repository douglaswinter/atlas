import { useState, useEffect } from "react";
import { api } from "../api";

// Blueapi Hooks & Types

import type { WorkerState } from "@atlas/blueapi";

export function useWorkerStatus() {
  const [workerState, setWorkerState] = useState<WorkerState>("UNKNOWN");
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const state = await api.worker.getState();
        setWorkerState(state);

        if (state === "RUNNING") {
          const activeTask = await api.worker.getActiveTask();
          setActiveTaskId(activeTask?.task_id || "Active");
        } else {
          setActiveTaskId(null);
        }
      } catch (err) {
        setWorkerState("UNKNOWN");
        setActiveTaskId(null);
      }
    };
    fetchStatus();
    const interval = setInterval(fetchStatus, 1000);
    return () => clearInterval(interval);
  }, []);

  return { workerState, activeTaskId };
}
