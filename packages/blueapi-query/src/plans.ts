import { useQuery } from "@tanstack/react-query";
import { useBlueapi } from "./provider";
import { planKeys } from "./queryKeys";

export function usePlans() {
  const blueapi = useBlueapi();
  return useQuery({
    queryKey: planKeys.all,
    queryFn: blueapi.plans.getAll,
  });
}

export function usePlan(name: string) {
  const blueapi = useBlueapi();
  return useQuery({
    queryKey: planKeys.detail(name),
    queryFn: () => blueapi.plans.get(name),
    enabled: !!name,
  });
}
