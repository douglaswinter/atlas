import { http, HttpResponse } from "msw";
import plansResponse from "./plans-response.json";
import devicesResponse from "./devices-response.json";

const fakeTaskId = "46709394";
export const handlers = [
  http.get("/api/plans", () => {
    return HttpResponse.json(plansResponse);
  }),
  http.get("/api/devices", () => {
    return HttpResponse.json(devicesResponse);
  }),
  http.get("/api/worker/state", () => {
    return HttpResponse.json("IDLE");
  }),
  http.put("/api/worker/task", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),
  http.put("/api/worker/task", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),

  http.post("/api/tasks", () => {
    return HttpResponse.json({ task_id: fakeTaskId }, { status: 201 });
  }),
];
