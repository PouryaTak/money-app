import { apiClient } from "@/lib/api-client";


export const addUser = async (user:{email:string, name: string}) => {
  const response = await apiClient.Post("api/user", user);
  return response.data;
};
