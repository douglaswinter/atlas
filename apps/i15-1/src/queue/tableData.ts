import type { BlueapiCallResponse, Status } from "./generated";
import type { PlanParameters, TaskStatus } from "./tasks";

export type QueueTableData = {
  position: number | null;
  id: string;
  instrumentSession: string;
  sampleId: string;
  planRunning: string;
  parameters: string;
  //   parameters: PlanParameters;
  status: Status;
  blueapi_tasks: BlueapiCallResponse[];
};
