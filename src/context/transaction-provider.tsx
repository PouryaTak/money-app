import { deleteStorageTransaction, getTransactions, saveStorageTransaction } from "@/functions/handle-transactions";
import { initialForm } from "@/helpers/static-data";
import { Transaction } from "@/types/transaction";
import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext<any>({});
export default function TransactionProvider({ children }: any) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>(initialForm);

  const saveTransaction = (transaction:Transaction) => {
    setTransactions(current => [...current, transaction])
    saveStorageTransaction(transaction)
  }

  const deleteTransaction = (id:string) => {
    const index = transactions.findIndex(i => i.id === id)
    setTransactions(current => [
      ...current.slice(0, index),
      ...current.slice(index + 1)
    ])
    deleteStorageTransaction(id)
  }

  useEffect(() => {
    const list = getTransactions();
    setTransactions(list);
  }, []);
  return (
    <TransactionContext.Provider value={{ transactions, setTransactions, saveTransaction, deleteTransaction, currentTransaction, setCurrentTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
}
