import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useBlueapi } from "./provider";
import { taskKeys } from "./queryKeys";

export function useTasks() {
  const blueapi = useBlueapi();
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: blueapi.tasks.getAll,
  });
}

export function useTask(taskId: string) {
  const blueapi = useBlueapi();
  return useQuery({
    queryKey: taskKeys.detail(taskId),
    queryFn: () => blueapi.tasks.get(taskId),
    enabled: !!taskId,
  });
}

export function useSubmitTask() {
  const client = useQueryClient();
  const blueapi = useBlueapi();

  return useMutation({
    mutationFn: blueapi.tasks.submit,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}

export function useDeleteTask() {
  const client = useQueryClient();
  const blueapi = useBlueapi();

  return useMutation({
    mutationFn: blueapi.tasks.delete,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
}
