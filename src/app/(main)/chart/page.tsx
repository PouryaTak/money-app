"use client";

import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { groupTransactionsByTypeCategory } from "@/functions/statistics";
import React, { useContext } from "react";

export default function Chart() {
  const { transactions } = useContext(TransactionContext);
  const { selectedDate } = useContext(DateContext);
  return (
    <div>
      {JSON.stringify(groupTransactionsByTypeCategory(selectedDate.startDate, selectedDate.endDate, transactions, "expense"))}
    </div>
  );
}
