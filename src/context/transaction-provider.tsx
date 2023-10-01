import {
  deleteStorageTransaction,
  getTransactions,
  saveStorageTransaction,
  updateStorageTransaction,
} from "@/functions/handle-transactions";
import { initialForm } from "@/helpers/static-data";
import { Transaction } from "@/types/transaction";
import { createContext, useContext, useEffect, useState } from "react";
import { DateContext } from "./date-provider";

export const TransactionContext = createContext<any>({});
export default function TransactionProvider({ children }: any) {
  const [transactionsStatus, setTransactionsStatus] = useState<"loading" | "error" | "success">("loading");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>(initialForm);
  const { selectedDate } = useContext(DateContext);

  const saveTransaction = (transaction: Transaction) => {
    setTransactions((current) => [...current, transaction]);
    // implement add api
  };

  const updateTransaction = (editedTransaction: Transaction) => {
    const transactionIndex = transactions.findIndex((i) => i.id === editedTransaction.id);
    setTransactions((current) => {
      const currentClone = JSON.parse(JSON.stringify(current));
      currentClone.splice(transactionIndex, 1, editedTransaction);
      return currentClone;
    });
    // implement update api
  };

  const deleteTransaction = (id: string) => {
    const index = transactions.findIndex((i) => i.id === id);
    setTransactions((current) => transactions.filter((i) => i.id !== id));
    // implement delete api
  };

  useEffect(() => {
    getTransactions(selectedDate.startDate, selectedDate.endDate)
      .then((response: any) => {
        setTransactions(response);
        setTransactionsStatus("success");
      })
      .catch((err: any) => setTransactionsStatus("error"));
  }, [selectedDate]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        saveTransaction,
        deleteTransaction,
        currentTransaction,
        setCurrentTransaction,
        updateTransaction,
        transactionsStatus,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
