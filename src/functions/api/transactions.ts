import { apiClient } from "@/lib/api-client";
import { Transaction } from "@/types/transaction";

export const getTransactions = async (startDate: string, endDate: string) => {
  const response = await apiClient.Get(
    `api/transactions?startDate=${startDate}&endDate=${endDate}`,
  );
  return response;
};

export const addTransaction = async (data: Transaction) => {
  const response = await apiClient.Post("api/transaction", data);
  return response.data;
};

export const deleteTransaction = async (id: string) => {
  const response = await apiClient.Delete("api/transaction?id=" + id);
  return response;
};

export const getSingleTransaction = async (id: string) => {
  const response = await apiClient.Get("api/transaction/" + id);
  return response;
};

export const updateTransaction = async (id: string, data: Transaction) => {
  const response = await apiClient.Put("api/transaction/" + id, data);
  return response.data;
};
