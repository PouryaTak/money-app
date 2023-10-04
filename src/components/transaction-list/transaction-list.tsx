"use client";
import { TransactionContext } from "@/context/transaction-provider";
import React, { useContext, useMemo } from "react";
import TransactionListItem from "./transaction-item";
import { DrawerContext } from "@/context/drawer-provider";
import { deleteTransaction } from "@/functions/handle-transactions";
import { Transaction } from "@/types/transaction";
import TransactionLoading from "./transaction-loading";

export default function TransactionList() {
  const { transactions, transactionsStatus } = useContext(TransactionContext);
  const { setIsDrawerOpen } = useContext(DrawerContext);
  const { deleteStoreTransaction, setCurrentTransaction } = useContext(TransactionContext);
  const sortedTransactions = useMemo(() => {
    return transactions.sort((a: any, b: any) => (a.date > b.date ? -1 : 1));
  }, [transactions]);

  const handleEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsDrawerOpen(true);
  };

  const handleDeleteTransaction = (transaction: Transaction) => {
    if (transaction._id) {
      deleteTransaction(transaction._id).then((res: any) => deleteStoreTransaction(transaction.id));
    }
  };

  return (
    <div className="flex flex-col gap-3 my-3 h-full overflow-y-auto">
      {transactionsStatus === "loading" ? (
        <TransactionLoading />
      ) : transactionsStatus === "error" ? (
        <span>Error happened</span>
      ) : Boolean(transactions.length) ? (
        sortedTransactions.map((i: any) => (
          <TransactionListItem
            transaction={i}
            key={i.id}
            handleEditTransaction={handleEditTransaction}
            handleDeleteTransaction={handleDeleteTransaction}
          />
        ))
      ) : (
        <span>No data</span>
      )}
    </div>
  );
}
