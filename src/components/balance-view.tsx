"use client";
import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { calculateAmountByType } from "@/functions/statistics";
import React, { useContext } from "react";
import { Card } from "@/components/ui/card";
import { numberSeparator } from "@/functions/number-separator";
import { ArrowDownToLine, ArrowDownUp, ArrowUpFromLine } from "lucide-react";

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
    <div className="flex gap-3 w-full mb-3">
      <Card className="p-5 ">
        <div className="flex items-center justify-between gap-3 h-full">
          <div>
            <h2 className="font-bold text-2xl">Expenses</h2>
            <span className="text-red-400 text-xl font-bold block">
              {numberSeparator(calcExpenses)}
            </span>
          </div>
          <ArrowUpFromLine className="text-red-400" size={40} />
        </div>
      </Card>
      <Card className="p-5 flex-1">
        <div className="flex items-center justify-between gap-3 h-full">
          <div>
          <h1 className="font-bold text-2xl">Balance</h1>
          <span className="text-xl font-bold block text-slate-700">
            {numberSeparator(calcIncomes - calcExpenses)}
          </span>
          </div>
          <ArrowDownUp size={40} className="text-slate-400" />
        </div>
      </Card>
      <Card className="p-5 ">
        <div className="flex items-center justify-between gap-3 h-full">
          <div>
            <h2 className="font-bold text-2xl">Incomes</h2>
            <span className="text-green-400 text-xl font-bold block">
              {numberSeparator(calcIncomes)}
            </span>
          </div>
          <ArrowDownToLine className="text-green-400" size={40} />  
        </div>
      </Card>
    </div>
  );
}
