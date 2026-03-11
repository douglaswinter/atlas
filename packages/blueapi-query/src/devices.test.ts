import type { Api, Device, DeviceResponse } from "@atlas/blueapi";
import type { QueryClient } from "@tanstack/react-query";
import { createTestQueryClient, renderWithProviders } from "./testUtils";
import { useDevice, useDevices } from "./devices";
import { render, waitFor } from "@atlas/vitest-conf";
import { deviceKeys } from "./queryKeys";

describe("Device hooks", () => {
  let api: Api;
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();

    api = {
      devices: {
        getAll: vi.fn(),
        get: vi.fn(),
      },
    } as unknown as Api;
  });

  it("calls blueapi.devices.getAll and uses deviceKeys.all for useDevices", async () => {
    const mockResponse: DeviceResponse = { devices: [] };
    (api.devices.getAll as any).mockResolvedValue(mockResponse);

    const { result } = renderWithProviders(
      () => useDevices(),
      api,
      queryClient,
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(mockResponse);
    });

    expect(api.devices.getAll).toHaveBeenCalledOnce();
    const cached = queryClient
      .getQueryCache()
      .find({ queryKey: deviceKeys.all });
    expect(cached).toBeDefined();
  });

  it("calls blueapi.devices.get with device name and uses deviceKeys.detail for useDevice", async () => {
    const deviceName = "cam1";
    const device: Device = {
      name: deviceName,
      protocols: [],
    };
    (api.devices.get as any).mockResolvedValue(device);

    const { result } = renderWithProviders(
      () => useDevice(deviceName),
      api,
      queryClient,
    );

    await waitFor(() => {
      expect(result.current.data).toEqual(device);
    });

    expect(api.devices.get).toHaveBeenCalledExactlyOnceWith(deviceName);

    const cached = queryClient
      .getQueryCache()
      .find({ queryKey: deviceKeys.detail(deviceName) });
    expect(cached).toBeDefined();
  });
});
