import { useQuery } from "@tanstack/react-query";

const QUEUE_SOCKET: string = "/api/queue";

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
    refetchInterval: pollRateMillis ?? 1000,
    refetchOnWindowFocus: true,
  });
}
