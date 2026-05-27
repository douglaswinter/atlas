import { http, HttpResponse, ws } from "msw";
import plansResponse from "./plans-response.json";

const fakeTaskId = "7304e8e0-81c6-4978-9a9d-9046ab79ce3c";
const workerStatus = { status: "IDLE", duration: 0 };

const fakeExperiments = {
  data: {
    instrumentSession: {
      experiments: {
        edges: [
          {
            node: {
              name: "Test experiment",
              sample: {
                name: "Test_sample",
                data: {
                  density: 56,
                  capillary: "bs1.5",
                  composition: "Stuff",
                  packing_fraction: 0.5,
                },
              },
              experimentDefinition: {
                name: "My Experiment",
                data: {
                  q_max: 67,
                  frames: 90,
                  beam_energy: 40,
                  time_per_pdf: 2,
                  focused_beam_size: 10,
                },
              },
            },
          },
        ],
      },
    },
  },
};

const fakePvws = ws.link("wss://pvws.diamond.ac.uk/pvws/pv");

const fakeQueue = [
  {
    experiment_definition: {
      plan_name: "sleep",
      sample_id: "1",
      params: {
        time: 10,
      },
      instrument_session: "cm12345-1",
    },
    id: "aaa",
    status: "Success",
    time_started: "",
    time_completed: "",
    errors: [],
    result: { outcome: "success" },
    blueapi_id: fakeTaskId,
    position: 1,
  },
  {
    experiment_definition: {
      plan_name: "robot_load",
      sample_id: "1",
      params: {
        puck: 1,
        position: 1,
      },
      instrument_session: "cm12345-1",
    },
    id: "bbb",
    status: "In progress",
    time_started: null,
    time_completed: null,
    errors: [],
    result: { outcome: "success" },
    blueapi_id: null,
    position: 2,
  },
  {
    experiment_definition: {
      plan_name: "static_collection_plan",
      sample_id: "1",
      params: {
        frames: 10,
        exposure_time: 0.5,
      },
      instrument_session: "cm12345-1",
    },
    id: "ccc",
    status: "Waiting",
    time_started: null,
    time_completed: null,
    errors: [],
    result: null,
    blueapi_id: null,
    position: 3,
  },
];

export const handlers = [
  http.put("/api/blueapi/worker/task", () => {
    workerStatus.status = "RUNNING";
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),

  http.post("/api/blueapi/tasks", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),

  http.put("/api/blueapi/worker/state", () => {
    return HttpResponse.json("IDLE");
  }),

  http.get("/oauth2/userinfo", () => {
    return HttpResponse.json({ preferredUsername: "abc123456" });
  }),

  http.get("/api/blueapi/worker/state", () => {
    if (workerStatus.duration >= 10) {
      workerStatus.status = "IDLE";
      workerStatus.duration = 0;
    } else workerStatus.duration++;
    return HttpResponse.json(workerStatus.status);
  }),

  http.post("/api/graphql", () => {
    return HttpResponse.json(fakeExperiments);
  }),

  fakePvws.addEventListener("connection", () => {
    console.log("WebSocket client connecting...");
  }),

  http.get("/api/blueapi/plans", () => {
    return HttpResponse.json(plansResponse);
  }),

  http.get("/api/daq-queue/queue/state", () => {
    return HttpResponse.json({ paused: true });
  }),

  http.get("/api/daq-queue/queue", () => {
    return HttpResponse.json(fakeQueue);
  }),
];
