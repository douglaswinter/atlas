import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useWorkerStatus } from "./useWorkerStatus";

vi.mock("../api", () => ({
  api: {
    worker: {
      getState: vi.fn().mockResolvedValue("IDLE"),
      getActiveTask: vi.fn().mockResolvedValue(null),
    },
  },
}));

describe("useWorkerStatus Hook", () => {
  it("should initialize with default parameters and update state safely", async () => {
    const { result } = renderHook(() => useWorkerStatus());

    expect(result.current.workerState).toBe("UNKNOWN");

    await waitFor(() => {
      expect(result.current.workerState).toBe("IDLE");
    });
  });
});
