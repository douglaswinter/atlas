import type { AxiosInstance } from "axios";

export interface Plan {
  name: string;
  description: string | undefined;
  schema: object;
}

export interface PlansResponse {
  plans: Plan[];
}

export function createPlansApi(client: AxiosInstance) {
  return {
    async getAll(): Promise<PlansResponse> {
      const { data } = await client.get("/plans");
      return data;
    },

    async get(name: string): Promise<Plan> {
      const { data } = await client.get(`/plans/${name}`);
      return data;
    },
  };
}
