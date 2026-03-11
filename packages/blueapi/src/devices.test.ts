import type { AxiosInstance } from "axios";
import { createDevicesApi, type DeviceResponse } from "./devices";

describe("createDevicesApi", () => {
  let client: AxiosInstance;
  let api: ReturnType<typeof createDevicesApi>;

  beforeAll(() => {
    client = {
      get: vi.fn(),
    } as unknown as AxiosInstance;

    api = createDevicesApi(client);
  });

  it("calls GET /devices on getAll()", async () => {
    const mockDevices: DeviceResponse = {
      devices: [
        {
          name: "stage_x",
          protocols: [
            {
              name: "Readable",
              types: [],
            },
          ],
        },
        {
          name: "stage_y",
          protocols: [
            {
              name: "Readable",
              types: [],
            },
          ],
        },
      ],
    };

    (client.get as any).mockResolvedValue({ data: mockDevices });

    const response = await api.getAll();

    expect(client.get).toHaveBeenCalledWith("/devices");
    expect(response).toEqual(mockDevices);
  });

  it("calls GET /devices/{name} on get(name)", async () => {
    const deviceName = "diode";
    const mockDevice = {
      name: deviceName,
      protocols: [
        {
          name: "Readable",
          types: [],
        },
      ],
    };

    (client.get as any).mockResolvedValue({ data: mockDevice });

    const response = await api.get(deviceName);

    expect(client.get).toHaveBeenCalledWith(`/devices/${deviceName}`);
    expect(response).toEqual(mockDevice);
  });
});
