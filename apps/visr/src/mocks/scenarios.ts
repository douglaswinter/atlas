import { delay, http, HttpResponse, type HttpHandler } from "msw";

const fakeTaskId = "7304e8e0-81c6-4978-9a9d-9046ab79ce3c";

export const scenarios = {
  success: [
    http.put("/api/worker/task", async () => {
      await delay();
      return HttpResponse.json({
        task_id: fakeTaskId,
      });
    }),
  ],
  error: [
    http.put("/api/worker/task", async () => {
      await delay();
      return new HttpResponse("Validation Error", {
        status: 422,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }),
  ],
};
