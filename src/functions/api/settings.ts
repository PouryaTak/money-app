import { apiClient } from "@/lib/api-client";


export const addSettings = async (settings:any) => {
  const response = await apiClient.Post("api/settings", settings);
  return response.data;
};

export const getSettings = async (email:string) => {
  const response = await apiClient.Get(`api/settings?email=${email}`);
  return response?.settings;
};
