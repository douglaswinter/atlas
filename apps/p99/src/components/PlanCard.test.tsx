import { render, screen, waitFor } from "@atlas/vitest-conf";
import { fireEvent } from "@testing-library/react";
import { DiamondTheme, ThemeProvider } from "@diamondlightsource/sci-react-ui";
import { PlanCard } from "./PlanCard";
import type { Plan } from "@atlas/blueapi";
import { vi, describe, it, expect, beforeEach } from "vitest";

const mockUseGetWorkerState = vi.fn(() => ({ data: "IDLE" }));
const mockSubmitTask = {
  mutateAsync: vi.fn(() => Promise.resolve({ task_id: "task-1" })),
};
const mockStartTask = { mutateAsync: vi.fn(() => Promise.resolve()) };

vi.mock("@atlas/blueapi-query", () => ({
  useGetWorkerState: () => mockUseGetWorkerState(),
  useSubmitTask: () => mockSubmitTask,
  useSetActiveTask: () => mockStartTask,
}));

const mockPlan: Plan = {
  name: "test-plan",
  description: "Test plan description\n\nParameters:\nSome params",
  schema: {
    properties: {
      param1: {
        type: "string",
        title: "Parameter 1",
        description: "First parameter",
      },
      param2: {
        type: "number",
        title: "Parameter 2",
        description: "Second parameter",
      },
    },
    required: ["param1"],
  },
};

describe("PlanCard", () => {
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseGetWorkerState.mockReset();
    mockUseGetWorkerState.mockReturnValue({ data: "IDLE" });
    mockSubmitTask.mutateAsync.mockClear();
    mockStartTask.mutateAsync.mockClear();
  });

  it("renders the plan name and description", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <PlanCard
          plan={mockPlan}
          instrumentSession="test-session"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText("test-plan")).toBeInTheDocument();
    expect(screen.getByText(/Test plan description/)).toBeInTheDocument();
  });

  it("displays Python chip", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <PlanCard
          plan={mockPlan}
          instrumentSession="test-session"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </ThemeProvider>,
    );

    expect(screen.getByText("Python")).toBeInTheDocument();
  });

  it("renders accordion with configure details", async () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <PlanCard
          plan={mockPlan}
          instrumentSession="test-session"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </ThemeProvider>,
    );

    // Click accordion to expand
    const accordionButton = screen.getByRole("button", {
      name: /Configure & View Details/i,
    });
    fireEvent.click(accordionButton);

    await waitFor(() => {
      expect(screen.getByText(/Protocol Documentation/)).toBeInTheDocument();
    });
  });

  it("enables submit button when worker is idle", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <PlanCard
          plan={mockPlan}
          instrumentSession="test-session"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </ThemeProvider>,
    );

    const buttons = screen.getAllByRole("button");
    const runButton = buttons.find(btn => btn.textContent?.includes("Run"));
    expect(runButton).not.toBeDisabled();
  });

  it("disables submit button when worker is busy", () => {
    mockUseGetWorkerState.mockReturnValue({ data: "RUNNING" });

    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <PlanCard
          plan={mockPlan}
          instrumentSession="test-session"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </ThemeProvider>,
    );

    const buttons = screen.getAllByRole("button");
    const runButton = buttons.find(btn => btn.textContent?.includes("Run"));
    expect(runButton).toBeDisabled();
  });

  it("shows configure & view details button", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <PlanCard
          plan={mockPlan}
          instrumentSession="test-session"
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </ThemeProvider>,
    );

    const configButton = screen.getByRole("button", {
      name: /Configure & View Details/i,
    });
    expect(configButton).toBeInTheDocument();
  });
});
