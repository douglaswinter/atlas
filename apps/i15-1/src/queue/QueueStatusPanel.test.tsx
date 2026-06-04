import { render, screen } from "@atlas/vitest-conf";
import { describe, it, expect, vi, afterEach } from "vitest";
import { QueueStatusPanel, QueueControlButton } from "./QueueStatusPanel";
import * as queueService from "./queueService";
import type { TaskWithPosition } from "./generated";

afterEach(() => {
  vi.restoreAllMocks();
});

describe("QueueStatusPanel", () => {
  it("shows Running state", () => {
    vi.spyOn(queueService, "useConnected").mockReturnValue({
      connected: true,
    } as any);

    vi.spyOn(queueService, "useGetQueuedTasks").mockReturnValue({
      data: [{ id: 1 }],
    } as any);

    vi.spyOn(queueService, "useToggleQueueState").mockReturnValue({
      paused: false,
    } as any);

    render(<QueueStatusPanel />);

    expect(screen.getByText(/Queue Running/i)).toBeInTheDocument();
  });
});
