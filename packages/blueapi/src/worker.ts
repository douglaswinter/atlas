import type { AxiosInstance } from "axios";
import type { TaskResponse } from "./tasks";

export type WorkerState =
  | "IDLE"
  | "RUNNING"
  | "PAUSING"
  | "PAUSED"
  | "HALTING"
  | "STOPPING"
  | "ABORTING"
  | "SUSPENDING"
  | "PANICKED"
  | "UNKNOWN";

/**
 * Request to transition a paused worker back to RUNNING.
 *
 * Valid only when the current worker state is PAUSED.
 * The server will reject this request with 400 if the transition is invalid.
 */
type ResumeRequest = {
  new_state: "RUNNING";
};

/**
 * Request to pause a running worker.
 *
 * Valid only from a RUNNING state
 */
type PauseRequest = {
  new_state: "PAUSED";

  /**
   * Controls when the pause occurs.
   *
   * - `false` (default): pause immediately and rewind to the previous checkpoint.
   * - `true`: wait until the next checkpoint before pausing.
   *
   * If the task defines no checkpoints, the task will be aborted instead.
   *
   * @default false
   */
  defer?: boolean;
};

type StopRequest = {
  new_state: "STOPPING";
};

type AbortRequest = {
  new_state: "ABORTING";
  reason?: string;
};

/**
 * Request payload for PUT /worker/state.
 *
 * The structure of the request depends on the desired target state.
 * Only certain state transitions are allowed by the server.
 */
export type WorkerStateRequest =
  | ResumeRequest
  | PauseRequest
  | StopRequest
  | AbortRequest;

/**
 * API for controlling and monitoring a worker in the experiment framework.
 *
 * Provides methods analogous to Bluesky worker commands:
 * - `getActiveTask` / `setActiveTask` to query or update the task currently running.
 * - `getState` / `setState` to query or update the worker’s execution state.
 */
export function createWorkerApi(client: AxiosInstance) {
  return {
    async getActiveTask(): Promise<TaskResponse> {
      const { data } = await client.get("/worker/task");
      return data;
    },

    async setActiveTask(taskId: string): Promise<TaskResponse> {
      const { data } = await client.put("/worker/task", { task_id: taskId });
      return data;
    },

    async getState(): Promise<WorkerState> {
      const { data } = await client.get("/worker/state");
      return data;
    },

    async setState(stateRequest: WorkerStateRequest): Promise<WorkerState> {
      const { data } = await client.put("/worker/state", stateRequest);
      return data;
    },
  };
}
