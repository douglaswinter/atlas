type TaskStatus =
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

type PlanParameters = {};

export type ExperimentDefinition = {
  plan_name: string;
  sample_id: string;
  params: PlanParameters;
  intrument_session: string;
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

export interface QueuedTasks {
  tasks: QueueElement[];
}
