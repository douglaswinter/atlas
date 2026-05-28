import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUEUE_SOCKET: string = "/api/daq-queue";

import axios, { type AxiosInstance } from "axios";
import { type QueuedTasks, type QueueStatus } from "./tasks";

export function createQueueApiClient(baseURL: string): AxiosInstance {
  return axios.create({ baseURL });
}

const getQueueState = async (): Promise<QueueStatus> => {
  const response = await axios.get<QueueStatus>(QUEUE_SOCKET + "/queue/state");
  return response.data;
};

export function useGetQueueState() {
  return useQuery({
    queryKey: ["state"],
    queryFn: getQueueState,
    staleTime: 0,
    refetchInterval: 1000,
  });
}

export const patchQueueState = async (
  new_state: boolean,
): Promise<QueueStatus> => {
  const response = await axios.patch<QueueStatus>(
    QUEUE_SOCKET + "/queue/state",
    { paused: new_state },
  );
  return response.data;
};

export function usePatchQueueState() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: patchQueueState,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["state"] });
    },
  });
}

const getQueuedTasks = async (): Promise<QueuedTasks> => {
  const response = await axios.get<QueuedTasks>(QUEUE_SOCKET + "/queue");
  return response.data;
};

export function useGetQueuedTasks() {
  return useQuery({
    queryKey: ["queue"],
    queryFn: getQueuedTasks,
    staleTime: 0,
    refetchInterval: 1000,
  });
}
