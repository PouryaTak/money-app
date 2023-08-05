"use client";
import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { calculateAmountByType } from "@/functions/statistics";
import React, { useContext } from "react";

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
    <div className="w-full flex justify-around items-center text-center p-5 bg-white my-3">
      <div className="flex flex-col">
        <span className="text-red-400">{calcExpenses}</span>
        <span className="text-blue-400">{calcIncomes}</span>
      </div>
      <h1 className="font-bold text-2xl">{calcIncomes - calcExpenses}</h1>
    </div>
  );
}
