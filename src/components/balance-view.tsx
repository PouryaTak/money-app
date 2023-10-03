"use client";
import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { calculateAmountByType } from "@/functions/statistics";
import React, { useContext, useMemo } from "react";
import { numberSeparator } from "@/functions/handle-numbers";

export default function Balance() {
  const { transactions } = useContext(TransactionContext);
  const { selectedDate } = useContext(DateContext);
  const calcExpenses = useMemo(
    () => calculateAmountByType(selectedDate.startDate, selectedDate.endDate, transactions, "expense"),
    [selectedDate.endDate, selectedDate.startDate, transactions]
  );
  const calcIncomes = useMemo(
    () => calculateAmountByType(selectedDate.startDate, selectedDate.endDate, transactions, "income"),
    [selectedDate.endDate, selectedDate.startDate, transactions]
  );

  return (
    <div className="flex gap-3 w-full mb-3">
      <div className="p-5 flex-1 bg-red-100/75 rounded-lg">
        <div className="h-full">
          <h2 className="font-bold text-xl">Expenses</h2>
          <span className="text-red-400 text-xl font-bold block">- {numberSeparator(calcExpenses)}</span>
        </div>
      </div>
      <div className="p-5 flex-1 bg-green-100/75 rounded-lg">
        <div className="h-full">
          <h2 className="font-bold text-xl">Incomes</h2>
          <span className="text-green-400 text-xl font-bold block">+ {numberSeparator(calcIncomes)}</span>
        </div>
      </div>
    </div>
  );
}
