import { apiClient } from "@/lib/api-client";
import { Transaction } from "@/types/transaction";

export const getTransactions = async (startDate: string, endDate: string, type: string, categories: string[]) => {
  const typeFilter = type !== 'all' ? `&type=${type}` : '';
  const categoryFilter = categories?.length > 0 ? `&category=${categories.join(',')}` : '';
  const response = await apiClient.Get(
    `api/transactions?startDate=${startDate}&endDate=${endDate}${typeFilter}${categoryFilter}`,
  );
  return response;
};

export const addTransaction = async (data: Transaction) => {
  const response = await apiClient.Post("api/transaction", data);
  return response;
};

export const deleteTransaction = async (id: string) => {
  const response = await apiClient.Delete("api/transaction?id=" + id);
  return response;
};

export const getTransactionDetail = async (id: string) => {  
  const response = await apiClient.Get("api/transaction/" + id);
  return response;
};

export const updateTransaction = async (id: string, data: Transaction) => {
  const response = await apiClient.Put("api/transaction/" + id, data);
  return response;
};
