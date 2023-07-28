import { Transaction } from "@/types/transaction";

export const getTransactions = () =>
  JSON.parse(localStorage.getItem("transactionList") || "[]");

export const saveStorageTransaction = (transaction: Transaction) => {
  const list = getTransactions();
  list.push(transaction);
  localStorage.setItem("transactionList", JSON.stringify(list));
};

export const deleteStorageTransaction = (id: string) => {
  const list = getTransactions();
  const index = list.findIndex((i) => i.id === id);
  list.splice(index, 1);

  localStorage.setItem("transactionList", JSON.stringify(list));
};
