import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBlueapi } from "./provider";
import { workerKeys } from "./queryKeys";

export function useActiveTask() {
  const blueapi = useBlueapi();
  return useQuery({
    queryKey: workerKeys.task,
    queryFn: () => blueapi.worker.getActiveTask(),
  });
}

export function useSetActiveTask() {
  const client = useQueryClient();
  const blueapi = useBlueapi();

  return useMutation({
    mutationFn: blueapi.worker.setActiveTask,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: workerKeys.task });
    },
  });
}

export function useGetWorkerState() {
  const blueapi = useBlueapi();
  return useQuery({
    queryKey: workerKeys.state,
    queryFn: blueapi.worker.getState,
    staleTime: 0,
    refetchInterval: 1000,
    refetchOnWindowFocus: true,
  });
}

export function useSetWorkerState() {
  const client = useQueryClient();
  const blueapi = useBlueapi();

  return useMutation({
    mutationFn: blueapi.worker.setState,
    onSuccess: () => client.invalidateQueries({ queryKey: workerKeys.state }),
  });
}
