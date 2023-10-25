'use client'
import { initialForm } from "@/helpers/static-data";
import { Transaction } from "@/types/transaction";
import { createContext, useState } from "react";

export const TransactionContext = createContext<any>({});
export default function TransactionProvider({ children }: any) {
  const [transactionsStatus, setTransactionsStatus] = useState<
    "loading" | "error" | "success"
  >("loading");
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentTransaction, setCurrentTransaction] =
    useState<Transaction>(initialForm);

  const saveStoreTransaction = (transaction: Transaction) => {
    setTransactions((current) => [...current, transaction]);
  };

  const updateStoreTransaction = (editedTransaction: Transaction) => {
    const transactionIndex = transactions.findIndex(
      (i) => i.id === editedTransaction.id,
    );
    setTransactions((current) => {
      const currentClone = JSON.parse(JSON.stringify(current));
      currentClone.splice(transactionIndex, 1, editedTransaction);
      return currentClone;
    });
  };

  const deleteStoreTransaction = (id: string) => {
    setTransactions((current) => transactions.filter((i) => i.id !== id));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        saveStoreTransaction,
        deleteStoreTransaction,
        currentTransaction,
        setCurrentTransaction,
        updateStoreTransaction,
        transactionsStatus,
        setTransactionsStatus
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
