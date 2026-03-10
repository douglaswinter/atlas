import type { AxiosInstance } from "axios";
import {
  createWorkerApi,
  type WorkerState,
  type WorkerStateRequest,
} from "./worker";
import type { TaskResponse } from "./tasks";

describe("createWorkerApi", () => {
  let client: AxiosInstance;
  let api: ReturnType<typeof createWorkerApi>;

  beforeEach(() => {
    client = {
      get: vi.fn(),
      put: vi.fn(),
    } as unknown as AxiosInstance;

    api = createWorkerApi(client);
  });

  it("calls GET /worker/task on getActiveTask()", async () => {
    const mockTask: TaskResponse = { task_id: "abcde-1234" };
    (client.get as any).mockResolvedValue({ data: mockTask });

    const response = await api.getActiveTask();

    expect(client.get).toHaveBeenCalledWith("/worker/task");
    expect(response).toEqual(mockTask);
  });

  it("calls PUT /worker/task with task_id on setActiveTask(taskId)", async () => {
    const taskId = "task12345";
    const mockResponse: TaskResponse = { task_id: taskId };
    const request = mockResponse;
    (client.put as any).mockResolvedValue({ data: mockResponse });

    const response = await api.setActiveTask(taskId);

    expect(client.put).toHaveBeenCalledWith("/worker/task", request);
    expect(response).toEqual(mockResponse);
  });

  it("calls GET /worker/state on getState()", async () => {
    const mockState: WorkerState = "RUNNING";
    (client.get as any).mockResolvedValue({ data: mockState });

    const response = await api.getState();

    expect(client.get).toHaveBeenCalledWith("/worker/state");
    expect(response).toEqual(mockState);
  });

  it("calls PUT /worker/state with WorkerStateRequest on setState", async () => {
    const paused: WorkerState = "PAUSED";
    (client.put as any).mockResolvedValue({ data: paused });
    const pause: WorkerStateRequest = { new_state: paused };

    const response = await api.setState(pause);

    expect(client.put).toHaveBeenCalledWith("/worker/state", pause);
    expect(response).toEqual(paused);
  });
});
