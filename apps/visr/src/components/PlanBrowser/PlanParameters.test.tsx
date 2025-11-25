import { describe, it, expect } from "vitest";
import type { Plan } from "../../utils/api";
import { render, screen } from "@testing-library/react";

import PlanParameters from "./PlanParameters";
import { InstrumentSessionProvider } from "../../context/instrumentSession/InstrumentSessionProvider";

const mockJsonFormsImpl = vi.fn(() => {
  return <div data-testid="jsonforms-sentinel" />;
});

vi.mock("@jsonforms/react", () => {
  return {
    JsonForms: () => mockJsonFormsImpl(),
  };
});

const plan: Plan = {
  name: "hi_plan",
  description: "Says hi to you",
  schema: {
    properties: { name: { title: "Name", type: "string" } },
  },
};

describe("PlanParameters", () => {
  it("renders a plan's name, description, parameters, session, and run button", () => {
    render(
      <InstrumentSessionProvider>
        <PlanParameters plan={plan} />
      </InstrumentSessionProvider>,
    );

    expect(screen.getByText(plan.name)).toBeInTheDocument();
    expect(screen.getByText(plan.description!)).toBeInTheDocument();
    expect(screen.getByTestId("jsonforms-sentinel")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Instrument Session" }));
    expect(screen.getByRole("button", { name: "Run" }));
  });

  it("renders fallback UI if JSON Forms component fails", async () => {
    // this time JsonForms will throw
    mockJsonFormsImpl.mockImplementation(() => {
      throw new Error("I can't do it!");
    });

    render(
      <InstrumentSessionProvider>
        <PlanParameters plan={plan} />
      </InstrumentSessionProvider>,
    );

    expect(screen.getByText("UI unavailable")).toBeInTheDocument();
  });
});
