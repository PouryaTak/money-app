import { apiClient } from "@/lib/api-client";


export const sendEmail = async (email:{email:string}) => {
  const response = await apiClient.Post("api/auth/email", email);
  return response.data;
};