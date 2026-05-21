import { render, screen, waitFor } from "@atlas/vitest-conf";
import { DiamondTheme, ThemeProvider } from "@diamondlightsource/sci-react-ui";
import { PlanCard } from "./PlanCard";
import type { Plan } from "@atlas/blueapi";
import { vi, describe, it, expect, beforeEach } from "vitest";

// Mock the api module
vi.mock("../api", () => ({
  api: {
    tasks: {
      submit: vi.fn(),
    },
    worker: {
      setActiveTask: vi.fn(),
    },
  },
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
  });

  it("renders the plan name and description", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <PlanCard
          plan={mockPlan}
          isWorkerRunning={false}
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
          isWorkerRunning={false}
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
          isWorkerRunning={false}
          onSuccess={mockOnSuccess}
          onError={mockOnError}
        />
      </ThemeProvider>,
    );

    // Click accordion to expand
    const accordionButton = screen.getByRole("button", {
      name: /Configure & View Details/i,
    });
    accordionButton.click();

    await waitFor(() => {
      expect(screen.getByText(/Protocol Documentation/)).toBeInTheDocument();
    });
  });

  it("enables submit button when worker is idle", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <PlanCard
          plan={mockPlan}
          isWorkerRunning={false}
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
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <PlanCard
          plan={mockPlan}
          isWorkerRunning={true}
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
          isWorkerRunning={false}
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
