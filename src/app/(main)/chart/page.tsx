"use client";
import Doughnut from "@/components/charts/doughnut";
import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { groupTransactionsByTypeCategory } from "@/functions/statistics";
import React, { useContext } from "react";

export default function Chart() {
  const { transactions } = useContext(TransactionContext);
  const { selectedDate } = useContext(DateContext);
  return (
    <div>
      <Doughnut
        data={groupTransactionsByTypeCategory(
          selectedDate.startDate,
          selectedDate.endDate,
          transactions,
          "expense",
        )}
      />
    </div>
  );
}
