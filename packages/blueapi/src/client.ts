import axios, { type AxiosInstance } from "axios";

export function createApiClient(baseURL: string): AxiosInstance {
  return axios.create({ baseURL });
}
