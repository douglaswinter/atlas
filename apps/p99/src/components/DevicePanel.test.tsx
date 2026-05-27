import { render, screen } from "@atlas/vitest-conf";
import { DevicePanel } from "./DevicePanel";

const mockDevicesData = {
  devices: [
    { name: "detector-1", type: "detector" },
    { name: "motor-x", type: "motor" },
    { name: "motor-y", type: "motor" },
  ],
};

describe("DevicePanel", () => {
  it("renders the devices panel with title", () => {
    render(<DevicePanel devicesData={mockDevicesData} />);

    expect(screen.getByText(/Connected Devices/)).toBeInTheDocument();
  });

  it("displays the correct device count", () => {
    render(<DevicePanel devicesData={mockDevicesData} />);

    expect(screen.getByText(/Connected Devices \(3\)/)).toBeInTheDocument();
  });

  it("renders all devices as chips", () => {
    render(<DevicePanel devicesData={mockDevicesData} />);

    expect(screen.getByText("detector-1")).toBeInTheDocument();
    expect(screen.getByText("motor-x")).toBeInTheDocument();
    expect(screen.getByText("motor-y")).toBeInTheDocument();
  });

  it("shows empty state when no devices are present", () => {
    render(<DevicePanel devicesData={{ devices: [] }} />);

    expect(screen.getByText(/Connected Devices \(0\)/)).toBeInTheDocument();
    expect(
      screen.getByText(/No devices detected on the worker/),
    ).toBeInTheDocument();
  });

  it("handles undefined devicesData gracefully", () => {
    render(<DevicePanel devicesData={undefined} />);

    expect(screen.getByText(/Connected Devices \(0\)/)).toBeInTheDocument();
    expect(
      screen.getByText(/No devices detected on the worker/),
    ).toBeInTheDocument();
  });
});
