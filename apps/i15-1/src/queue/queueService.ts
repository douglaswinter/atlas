import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// const QUEUE_SOCKET: string = "/api/daq-queue";
const QUEUE_SOCKET: string = "http://127.0.0.1:8001";

import axios, { type AxiosInstance } from "axios";
import { useEffect, useState } from "react";
import type {
  QueueState,
  TaskCancelRequest,
  TaskWithPosition,
} from "./generated";
import type { QueuedTasks } from "./tasks";

export function createQueueApiClient(baseURL: string): AxiosInstance {
  return axios.create({ baseURL });
}

export function useQueueEvents() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const source = new EventSource(QUEUE_SOCKET + "/events");

    source.addEventListener("state_update", (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      queryClient.setQueryData(["state"], data);
    });

    source.addEventListener("queue_update", (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      queryClient.setQueryData(["queue"], data);
    });

    source.addEventListener("history_update", (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      queryClient.setQueryData(["history"], data);
    });

    source.addEventListener("tasks_update", (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      queryClient.setQueryData(["tasks"], data);
    });

    source.addEventListener("call_queue_update", (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      queryClient.setQueryData(["call_queue"], data);
    });

    source.addEventListener("call_history_update", (event) => {
      const data = JSON.parse((event as MessageEvent).data);
      queryClient.setQueryData(["call_history"], data);
    });

    source.onerror = (err) => {
      console.error("SSE error:", err);
      source.close();
    };

    return () => {
      source.close();
    };
  }, [queryClient]);
}

const getQueueState = async (): Promise<QueueState> => {
  const response = await axios.get<QueueState>(QUEUE_SOCKET + "/queue/state");
  return response.data;
};

export function useGetQueueState() {
  return useQuery({
    queryKey: ["state"],
    queryFn: getQueueState,
    staleTime: Infinity,
    refetchInterval: false,
  });
}

export const patchQueueState = async (paused: boolean): Promise<QueueState> => {
  const response = await axios.patch<QueueState>(
    QUEUE_SOCKET + "/queue/state",
    { paused: paused },
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

export function useToggleQueueState() {
  const { data } = useGetQueueState();
  const mutation = usePatchQueueState();

  const toggle = async () => {
    if (data == null) return;
    return mutation.mutateAsync(!data.paused);
  };

  return {
    paused: data?.paused ?? false,
    isLoading: mutation.isPending,
    toggle,
    isDisabled: mutation.isPending || data == null,
  };
}

const getQueuedTasks = async (): Promise<QueuedTasks> => {
  const response = await axios.get<QueuedTasks>(QUEUE_SOCKET + "/queue");
  return response.data;
};

export function useGetQueuedTasks() {
  return useQuery({
    queryKey: ["queue"],
    queryFn: getQueuedTasks,
    staleTime: Infinity,
    refetchInterval: false,
  });
}

const getAllTasks = async (): Promise<QueuedTasks> => {
  const response = await axios.get<QueuedTasks>(QUEUE_SOCKET + "/tasks");
  return response.data;
};

export function useGetAllTasks() {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: getAllTasks,
    staleTime: Infinity,
    refetchInterval: false,
  });
}

const getHistoricTasks = async (): Promise<QueuedTasks> => {
  const response = await axios.get<QueuedTasks>(QUEUE_SOCKET + "/history");
  return response.data;
};

export function useGetHistoricTasks() {
  return useQuery({
    queryKey: ["history"],
    queryFn: getHistoricTasks,
    staleTime: Infinity,
    refetchInterval: false,
  });
}

export const cancelTasks = async (taskIds: string[]): Promise<QueuedTasks> => {
  const response = await axios.delete<QueuedTasks>(
    QUEUE_SOCKET + "/queue/tasks",
    {
      data: {
        task_ids: taskIds,
      } as TaskCancelRequest,
    },
  );

  return response.data;
};

export function useCancelTasks() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: cancelTasks,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["queue"] });
    },
  });
}

export const moveTask = async ({
  taskId,
  newPosition,
}: {
  taskId: string;
  newPosition: number;
}): Promise<number> => {
  const response = await axios.post<number>(
    QUEUE_SOCKET + "/queue/move",
    null,
    {
      params: {
        task_id: taskId,
        new_position: newPosition,
      },
    },
  );

  return response.data;
};

export function useMoveTask() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: moveTask,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["queue"] });
    },
  });
}

export const clearHistory = async (): Promise<number> => {
  const response = await axios.delete<number>(QUEUE_SOCKET + "/history");

  return response.data;
};
