import type { BlueapiCallResponse, TaskWithPosition } from "./generated";

export interface QueueStatus {
  paused: boolean;
}

export type TaskStatus =
  | "Waiting"
  | "Claimed"
  | "In progress"
  | "Success"
  | "Error"
  | "Cancelled";

type TaskResult = {
  outcome: string;
  result?: any;
  type?: string;
};

// Temporary parameters to see if things work in the first instance
type LoadParameters = {
  puck: number;
  position: number;
};

type SleepParameters = {
  time: number;
};

type StaticCollectionParameters = {
  frames: number;
  exposure_time: number;
};

export type PlanParameters =
  | LoadParameters
  | SleepParameters
  | StaticCollectionParameters;

export type ExperimentDefinition = {
  plan_name: string;
  sample_id: string;
  params: PlanParameters;
  instrument_session: string;
};

export interface QueueElement {
  experiment_definition: ExperimentDefinition;
  id: string;
  status: TaskStatus;
  time_started: string;
  time_completed: string;
  errors: string[];
  result: TaskResult;
  blueapi_id: string;
  position: number; // position in the queue
}

export type QueuedTasks = TaskWithPosition[];
