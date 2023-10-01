"use client";
import { TransactionContext } from "@/context/transaction-provider";
import React, { useContext } from "react";
import TransactionListItem from "./transaction-item";

export default function TransactionList() {
  const { transactions, transactionsStatus } = useContext(TransactionContext);

  return (
    <div className="flex flex-col gap-3 my-3 h-full overflow-y-auto">
      {transactionsStatus === "loading" ? (
        <span>Loading...</span>
      ) : transactionsStatus === "error" ? (
        <span>Error happened</span>
      ) : Boolean(transactions.length) ? (
        transactions
          .sort((a: any, b: any) => (a.date > b.date ? -1 : 1))
          .map((i: any) => {
            return <TransactionListItem transaction={i} key={i.id} />;
          })
      ) : (
        <span>No data</span>
      )}
    </div>
  );
}
