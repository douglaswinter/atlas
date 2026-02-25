import { useQuery } from "@tanstack/react-query";
import { useBlueapi } from "./provider";
import { deviceKeys } from "./queryKeys";

export function useDevices() {
  const blueapi = useBlueapi();
  return useQuery({
    queryKey: deviceKeys.all,
    queryFn: blueapi.devices.getAll,
  });
}

export function useDevice(deviceName: string) {
  const blueapi = useBlueapi();
  return useQuery({
    queryKey: deviceKeys.detail(deviceName),
    queryFn: () => blueapi.devices.get(deviceName),
  });
}
