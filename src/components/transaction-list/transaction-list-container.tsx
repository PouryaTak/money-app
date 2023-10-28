"use client"
import React, { useContext, useMemo } from "react";
import { TransactionContext } from "@/context/transaction-provider";
import { DrawerContext } from "@/context/drawer-provider";
import { deleteTransaction } from "@/functions/api/transactions";
import { Transaction } from "@/types/transaction";
import TransactionList from "@/components/transaction-list/transaction-list";
import { DictionaryContext } from "@/context/dictionary-provider";

export default function TransactionListContainer() {
  const { transactions, transactionsStatus } = useContext(TransactionContext);
  const { setIsDrawerOpen } = useContext(DrawerContext);
  const {dictionary} = useContext(DictionaryContext)
  const { deleteStoreTransaction, setCurrentTransaction } =
    useContext(TransactionContext);
  const sortedTransactions = useMemo(() => {
    return (
      transactions.sort((a: any, b: any) => (a.date > b.date ? -1 : 1)) || []
    );
  }, [transactions]);

  const handleEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsDrawerOpen(true);
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    if (transaction._id) {
      deleteTransaction(transaction._id).then((res: any) =>
        deleteStoreTransaction(transaction.id),
      );
    }
  };
  return (
    <TransactionList
      status={transactionsStatus}
      sortedTransactions={sortedTransactions}
      handleEdit={handleEditTransaction}
      handleDelete={handleDeleteTransaction}
      dictionary={dictionary}
    />
  );
}
