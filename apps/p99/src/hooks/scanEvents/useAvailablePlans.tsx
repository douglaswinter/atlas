import { usePlans } from "@atlas/blueapi-query";

export const useAvailablePlans = () => {
  const query = usePlans();

  return {
    plans: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    // This allows the UI to trigger a refresh
    refresh: query.refetch,
  };
};
