import { http, HttpResponse, graphql } from "msw";
// import type { Person } from "../context/userAuth/authUtils";

const fakeTaskId = "7304e8e0-81c6-4978-9a9d-9046ab79ce3c";

export const handlers = [
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

  http.put("/api/worker/state", () => {
    return HttpResponse.json("IDLE");
  }),

  // http.put("/oauth2/sign_in", () => {}),

  // http.put("/oauth2/sign_out", () => {}),

  http.get("/oauth2/userinfo", (request) => {
    // const auth = request.request.headers.get("authorization");

    // if (auth && auth.startsWith("Bearer ")) {
    //   const user: Person = {
    //     identifier: auth.slice(7),
    //     accepted_orca_eula: true,
    //   };
    //   return HttpResponse.json(user);
    // }

    // return new HttpResponse(null, { status: 401 });
    return new HttpResponse({ preferredUsername: "nonloso" });
  }),
];
