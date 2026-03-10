import type { AxiosInstance } from "axios";

export interface ProtocolInfo {
  /** The name of the BlueSky protocol e.g. "Readable" */
  name: string;
  types: string[];
}

export interface Device {
  name: string;
  protocols: ProtocolInfo[];
}

export interface DeviceResponse {
  devices: Device[];
}

export function createDevicesApi(client: AxiosInstance) {
  return {
    async getAll(): Promise<DeviceResponse> {
      const { data } = await client.get("/devices");
      return data;
    },

    async get(deviceName: string): Promise<Device> {
      const { data } = await client.get(`/devices/${deviceName}`);
      return data;
    },
  };
}
