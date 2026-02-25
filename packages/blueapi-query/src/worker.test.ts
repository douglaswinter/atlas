import type {
  Api,
  TaskResponse,
  WorkerState,
  WorkerStateRequest,
} from "@atlas/blueapi";
import type { QueryClient } from "@tanstack/react-query";
import { createTestQueryClient, renderWithProviders } from "./testUtils";
import {
  useActiveTask,
  useGetWorkerState,
  useSetActiveTask,
  useSetWorkerState,
} from "./worker";
import { act, waitFor } from "@atlas/vitest-conf";
import { workerKeys } from "./queryKeys";

describe("Worker hooks", () => {
  let api: Api;
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    api = {
      worker: {
        getActiveTask: vi.fn(),
        setActiveTask: vi.fn(),
        getState: vi.fn(),
        setState: vi.fn(),
      },
    } as unknown as Api;
  });

  it("calls blueapi.worker.getActiveTask and uses workerKeys.task on useActiveTask", async () => {
    const taskResponse: TaskResponse = { task_id: "task123" };
    (api.worker.getActiveTask as any).mockResolvedValue(taskResponse);

    const { result } = renderWithProviders(
      () => useActiveTask(),
      api,
      queryClient,
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(taskResponse);
    });

    expect(api.worker.getActiveTask).toHaveBeenCalledOnce();

    const cached = queryClient
      .getQueryCache()
      .find({ queryKey: workerKeys.task });
    expect(cached).toBeDefined();
  });

  it("calls blueapi.worker.setActiveTask and invalidates workerKeys.task on useSetActiveTask", async () => {
    const taskId = "mytask123";
    const mockResponse: TaskResponse = { task_id: taskId };
    (api.worker.setActiveTask as any).mockResolvedValue(mockResponse);

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");

    const { result } = renderWithProviders(
      () => useSetActiveTask(),
      api,
      queryClient,
    );

    let mutationResult: TaskResponse;

    await act(async () => {
      mutationResult = await result.current.mutateAsync(taskId);
    });

    expect(api.worker.setActiveTask).toHaveBeenCalledWith(
      taskId,
      expect.any(Object),
    );

    expect(mutationResult!).toEqual(mockResponse);

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: workerKeys.task });
  });

  it("calls blueapi.worker.getState and uses workerKeys.state on useGetWorkerState", async () => {
    const mockState: WorkerState = "PAUSED";
    (api.worker.getState as any).mockResolvedValue(mockState);

    const { result } = renderWithProviders(
      () => useGetWorkerState(),
      api,
      queryClient,
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockState);
    });

    expect(api.worker.getState).toHaveBeenCalled();
    const cached = queryClient
      .getQueryCache()
      .find({ queryKey: workerKeys.state });
    expect(cached).toBeDefined();
  });

  it("calls blueapi.worker.setState and invalidates workerKeys.state on useSetWorkerState", async () => {
    const req: WorkerStateRequest = { new_state: "PAUSED" };
    const mockResponse: WorkerState = "PAUSED";
    (api.worker.setState as any).mockResolvedValue(mockResponse);

    const invalidateSpy = vi.spyOn(queryClient, "invalidateQueries");
    let mutationResult: WorkerState;
    const { result } = renderWithProviders(
      () => useSetWorkerState(),
      api,
      queryClient,
    );

    await act(async () => {
      mutationResult = await result.current.mutateAsync(req);
    });

    expect(api.worker.setState).toHaveBeenCalledExactlyOnceWith(
      req,
      expect.any(Object),
    );

    expect(mutationResult!).toEqual(mockResponse);

    expect(invalidateSpy).toHaveBeenCalledWith({ queryKey: workerKeys.state });
  });
});
