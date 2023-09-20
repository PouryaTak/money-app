"use client";
import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { Transaction } from "@/types/transaction";
import React, { useContext, useMemo } from "react";
import TransactionListItem from "./transaction-item";


export default function TransactionList() {
  const { transactions } = useContext(TransactionContext);
  const { selectedDate } = useContext(DateContext);

  const filteredList = useMemo(() => {
    return transactions.filter((i: Transaction) => i.date <= selectedDate.endDate && i.date >= selectedDate.startDate);
  }, [selectedDate, transactions]);


  return (
    <div className="flex flex-col gap-3 my-3 h-full overflow-y-auto">
      {Boolean(filteredList.length) &&
        filteredList
          .sort((a: any, b: any) => (a.date > b.date ? -1 : 1))
          .map((i: any) => {
            return <TransactionListItem transaction={i} key={i.id} />;
          })}
    </div>
  );
}
