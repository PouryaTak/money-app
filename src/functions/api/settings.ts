import { apiClient } from "@/lib/api-client";


export const addSettings = async (settings:any) => {
  const response = await apiClient.Post("api/settings", settings);
  return response.data;
};

export const getSettings = async () => {
  const response = await apiClient.Get("api/settings");
  return response.settings[0];
};
