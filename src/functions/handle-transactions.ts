import { Transaction } from "@/types/transaction";

export const getTransactions = () =>
  JSON.parse(localStorage.getItem("transactionList") || "[]");

export const saveStorageTransaction = (transaction: Transaction) => {
  const list = getTransactions();
  list.push(transaction);
  localStorage.setItem("transactionList", JSON.stringify(list));
};

export const updateStorageTransaction = (transaction: Transaction) => {
  const list = getTransactions();
  const transactionIndex = list.findIndex(
    (i: Transaction) => i.id === transaction.id,
  );
  list.splice(transactionIndex, 1, transaction);
  localStorage.setItem("transactionList", JSON.stringify(list));
};

export const deleteStorageTransaction = (id: string) => {
  const list = getTransactions();
  const index = list.findIndex((i: Transaction) => i.id === id);
  list.splice(index, 1);

  localStorage.setItem("transactionList", JSON.stringify(list));
};

export const addCommas = (num: any) =>
  num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
export const removeNonNumeric = (num: any) =>
  num.toString().replace(/[^0-9]/g, "");
