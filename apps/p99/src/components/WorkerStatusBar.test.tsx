import { render, screen, waitFor } from "@atlas/vitest-conf";
import { DiamondTheme, ThemeProvider } from "@diamondlightsource/sci-react-ui";
import { WorkerStatusBar } from "./WorkerStatusBar";
import type { WorkerState } from "@atlas/blueapi";
import { describe, it, expect, vi } from "vitest";

describe("WorkerStatusBar", () => {
  const mockOnSync = vi.fn();

  it("renders the title and subtitle", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <WorkerStatusBar
          workerState="IDLE"
          activeTaskId={null}
          isFetching={false}
          onSync={mockOnSync}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText("P99 Control")).toBeInTheDocument();
    expect(screen.getByText("Beamline Plan Library")).toBeInTheDocument();
  });

  it("displays worker state as IDLE", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <WorkerStatusBar
          workerState="IDLE"
          activeTaskId={null}
          isFetching={false}
          onSync={mockOnSync}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/STATE: IDLE/)).toBeInTheDocument();
  });

  it("displays worker state as RUNNING", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <WorkerStatusBar
          workerState="RUNNING"
          activeTaskId="task-123"
          isFetching={false}
          onSync={mockOnSync}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/STATE: RUNNING/)).toBeInTheDocument();
    expect(screen.getByText(/ID: task-/)).toBeInTheDocument();
  });

  it("displays worker state as PAUSED", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <WorkerStatusBar
          workerState="PAUSED"
          activeTaskId={null}
          isFetching={false}
          onSync={mockOnSync}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/STATE: PAUSED/)).toBeInTheDocument();
  });

  it("displays PANICKED state", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <WorkerStatusBar
          workerState="PANICKED"
          activeTaskId={null}
          isFetching={false}
          onSync={mockOnSync}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/STATE: PANICKED/)).toBeInTheDocument();
  });

  it("displays ABORTING state", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <WorkerStatusBar
          workerState="ABORTING"
          activeTaskId={null}
          isFetching={false}
          onSync={mockOnSync}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/STATE: ABORTING/)).toBeInTheDocument();
  });

  it("renders sync button", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <WorkerStatusBar
          workerState="IDLE"
          activeTaskId={null}
          isFetching={false}
          onSync={mockOnSync}
        />
      </ThemeProvider>,
    );

    const syncButton = screen.getByRole("button", { name: /sync/i });
    expect(syncButton).toBeInTheDocument();
  });

  it("disables sync button when fetching", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <WorkerStatusBar
          workerState="IDLE"
          activeTaskId={null}
          isFetching={true}
          onSync={mockOnSync}
        />
      </ThemeProvider>,
    );

    const syncButton = screen.getByRole("button", { name: /sync/i });
    expect(syncButton).toBeDisabled();
  });

  it("calls onSync when sync button is clicked", async () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <WorkerStatusBar
          workerState="IDLE"
          activeTaskId={null}
          isFetching={false}
          onSync={mockOnSync}
        />
      </ThemeProvider>,
    );

    const syncButton = screen.getByRole("button", { name: /sync/i });
    syncButton.click();

    await waitFor(() => {
      expect(mockOnSync).toHaveBeenCalled();
    });
  });

  it("displays UNKNOWN state", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <WorkerStatusBar
          workerState="UNKNOWN"
          activeTaskId={null}
          isFetching={false}
          onSync={mockOnSync}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText(/STATE: UNKNOWN/)).toBeInTheDocument();
  });
});
