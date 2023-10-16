"use client";
import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { groupTransactionsByTypeCategory } from "@/functions/statistics";
import React, { useContext, useMemo, useState } from "react";
import ChartView from "@/components/chart/chart";

const dropDownItems = [
  { value: "expense", title: "Expense" },
  { value: "income", title: "Income" },
];

export default function ChartContainer() {
  const { transactions, transactionsStatus } = useContext(TransactionContext);
  const { selectedDate } = useContext(DateContext);
  const [type, setType] = useState<any>("expense");
  const data = useMemo(
    () =>
      groupTransactionsByTypeCategory(selectedDate.startDate, selectedDate.endDate, transactions, type).sort((a, b) =>
        a.amount > b.amount ? -1 : 1
      ),
    [selectedDate.endDate, selectedDate.startDate, transactions, type]
  );

  return <ChartView data={data} items={dropDownItems} selected={type} setSelected={setType} isLoading={transactionsStatus === 'loading'} />;
}
