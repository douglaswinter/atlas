export interface ScanEventMessage {
  status: "running" | "finished" | "failed";
  filepath: string;
  snake: boolean;
  uuid: string;
}
