import type { TaskWithPosition } from "../../generated/queue";

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

export type QueuedTasks = TaskWithPosition[];
