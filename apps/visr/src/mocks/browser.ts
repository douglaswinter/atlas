import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";
import { scenarios } from "./scenarios";

const scenarioName = new URLSearchParams(window.location.search).get(
  "scenario",
);
const runtimeScenarios =
  scenarios[scenarioName as keyof typeof scenarios] || [];

export const worker = setupWorker(...runtimeScenarios, ...handlers);
