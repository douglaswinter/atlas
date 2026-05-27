import type { PlanParameters, TaskStatus } from "./tasks";

export type QueueTableData = {
  position: number;
  instrumentSession: string;
  sampleId: string;
  planRunning: string;
  parameters: string;
  //   parameters: PlanParameters;
  status: TaskStatus;
};
