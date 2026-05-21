import { render, screen } from "@atlas/vitest-conf";
import { DiamondTheme, ThemeProvider } from "@diamondlightsource/sci-react-ui";
import { DevicePanel } from "./DevicePanel";
import { describe, it, expect } from "vitest";

const mockDevicesData = {
  devices: [
    { name: "detector-1", type: "detector" },
    { name: "motor-x", type: "motor" },
    { name: "motor-y", type: "motor" },
  ],
};

describe("DevicePanel", () => {
  it("renders the devices panel with title", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <DevicePanel devicesData={mockDevicesData} />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Connected Devices/)).toBeInTheDocument();
  });

  it("displays the correct device count", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <DevicePanel devicesData={mockDevicesData} />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Connected Devices \(3\)/)).toBeInTheDocument();
  });

  it("renders all devices as chips", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <DevicePanel devicesData={mockDevicesData} />
      </ThemeProvider>,
    );

    expect(screen.getByText("detector-1")).toBeInTheDocument();
    expect(screen.getByText("motor-x")).toBeInTheDocument();
    expect(screen.getByText("motor-y")).toBeInTheDocument();
  });

  it("shows empty state when no devices are present", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <DevicePanel devicesData={{ devices: [] }} />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Connected Devices \(0\)/)).toBeInTheDocument();
    expect(
      screen.getByText(/No devices detected on the worker/),
    ).toBeInTheDocument();
  });

  it("handles undefined devicesData gracefully", () => {
    render(
      <ThemeProvider theme={DiamondTheme} defaultMode="light">
        <DevicePanel devicesData={undefined} />
      </ThemeProvider>,
    );

    expect(screen.getByText(/Connected Devices \(0\)/)).toBeInTheDocument();
    expect(
      screen.getByText(/No devices detected on the worker/),
    ).toBeInTheDocument();
  });
});
