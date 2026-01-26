import { http, HttpResponse } from "msw";
import workflowsResponse from "./workflows-response.json";
import plansResponse from "./plans-response.json";
import instrumentSessionsResponse from "./instrumentSessions-response.json";
import type { ScanEventMessage } from "../components/useSpectroscopyData";

const fakeTaskId = "7304e8e0-81c6-4978-9a9d-9046ab79ce3c";

function mapData(): (number | null)[][] {
  return [
    [
      5467227.0, 5467227.0, 5480663.0, 5478486.0, 5477020.0, 5474645.0,
      5472603.0, 5470330.0, 5468827.0, 5467346.0,
    ],
    [
      5465947.0, 5464940.0, 5483401.0, 5480384.0, 5477378.0, 5474776.0,
      5471462.0, 5450634.0, 5454651.0, 5465208.0,
    ],
    [
      5463907.0, 5463469.0, 5481975.0, 5479338.0, 5476649.0, 5474993.0,
      5473529.0, 5471431.0, 5470030.0, 5468721.0,
    ],
    [
      5466907.0, 5466023.0, 5483679.0, 5480875.0, 5478044.0, 5475180.0,
      5473196.0, 5471168.0, 5469539.0, 5468190.0,
    ],
    [
      5466626.0, 5465494.0, 5483503.0, 5480586.0, 5477659.0, 5475069.0,
      5473287.0, 5471380.0, 5469737.0, 5468496.0,
    ],
    [
      5466713.0, 5465920.0, 5483587.0, 5480582.0, 5477829.0, 5475202.0,
      5473244.0, 5471103.0, 5468010.0, 5468222.0,
    ],
    [5467700.0, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null, null, null],
  ];
}

export const handlers = [
  http.post("/api/graphql", request => {
    const referrer = request.request.referrer;
    if (referrer.search("workflows") > 0) {
      return HttpResponse.json(workflowsResponse);
    } else {
      return HttpResponse.json(instrumentSessionsResponse);
    }
  }),

  http.get("/api/plans", () => {
    return HttpResponse.json(plansResponse);
  }),

  http.put("/api/worker/task", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),

  http.post("/api/tasks", () => {
    return HttpResponse.json({
      task_id: fakeTaskId,
    });
  }),

  http.get("/api/data/map", ({ request }) => {
    const url = new URL(request.url);
    const filepath = url.searchParams.get("filepath");
    const datapath = url.searchParams.get("datapath");
    console.log("Mock /api/data/map called", { filepath, datapath });
    const data = mapData();
    return HttpResponse.json({ values: data });
  }),

  http.get("/api/data/events", async () => {
    const encoder = new TextEncoder();

    // Create a ReadableStream that emits fake scan events
    const stream = new ReadableStream({
      start(controller) {
        const send = (event: ScanEventMessage) => {
          controller.enqueue(
            encoder.encode(`data: ${JSON.stringify(event)}\n\n`),
          );
        };

        // scan starts
        send({
          uuid: "fake-scan-uuid",
          filepath: "/mock/path/fake.nxs",
          status: "running",
        });

        // simulate data collection for ~5 seconds
        let counter = 0;
        const interval = setInterval(() => {
          counter++;
          console.log("Mock event tick", counter);
          if (counter >= 25) {
            clearInterval(interval);
            // Scan stops
            send({
              uuid: "fake-scan-uuid",
              filepath: "/mock/path/fake.nxs",
              status: "finished",
            });
          }
        }, 200);
      },
    });

    return new HttpResponse(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }),
];
