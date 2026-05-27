import { useQuery } from "@tanstack/react-query";

const QUEUE_SOCKET: string = "/api/daq-queue";

function queueCall(
  endpoint: string,
  method?: string,
  body?: object,
): Promise<Response> {
  const _method = method ?? "GET";
  const fullUrl = QUEUE_SOCKET + endpoint;
  return fetch(fullUrl, {
    headers: {},
    method: _method,
    body: body ? JSON.stringify(body) : null,
  });
}

export function useQueueCall(
  endpoint: string,
  method?: string,
  body?: object,
  pollRateMillis?: number,
  queryKey?: string,
) {
  const fetchCall = async () => {
    return await queueCall(endpoint, method, body);
  };
  return useQuery({
    queryKey: [queryKey ?? "QueueCall"],
    queryFn: fetchCall,
    staleTime: 0,
    refetchInterval: pollRateMillis ?? 5000,
    refetchOnWindowFocus: true,
  });
}

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
