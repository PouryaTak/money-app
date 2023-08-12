"use client";
import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { calculateAmountByType } from "@/functions/statistics";
import React, { useContext } from "react";
import { Card } from "@/components/ui/card";

export default function Balance() {
  const { transactions } = useContext(TransactionContext);
  const { selectedDate } = useContext(DateContext);
  const calcExpenses = calculateAmountByType(
    selectedDate.startDate,
    selectedDate.endDate,
    transactions,
    "expense"
  );
  const calcIncomes = calculateAmountByType(
    selectedDate.startDate,
    selectedDate.endDate,
    transactions,
    "income"
  );

  return (
    <Card className="p-5">
      <div className="flex flex-col">
        <h1 className="font-bold text-2xl">{calcIncomes - calcExpenses}</h1>
        <span className="text-red-400">{calcExpenses}</span>
        <span className="text-blue-400">{calcIncomes}</span>
      </div>
    </Card>
  );
}
