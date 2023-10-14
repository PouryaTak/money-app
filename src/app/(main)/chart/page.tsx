"use client";

import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { numberSeparator } from "@/functions/handle-numbers";
import {
  convertChartData,
  groupTransactionsByTypeCategory,
} from "@/functions/statistics";
import React, { useContext, useMemo, useState } from "react";
import { VictoryContainer, VictoryPie } from "victory";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export default function Chart() {
  const { transactions } = useContext(TransactionContext);
  const { selectedDate } = useContext(DateContext);
  const [type, setType] = useState<any>("expense");
  const data = useMemo(
    () =>
      groupTransactionsByTypeCategory(
        selectedDate.startDate,
        selectedDate.endDate,
        transactions,
        type,
      ).reverse(),
    [selectedDate.endDate, selectedDate.startDate, transactions, type],
  );
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex justify-between items-center w-full py-2 px-3 bg-gray-100 rounded-lg mb-5">
          <span>{type}</span>
          <ChevronDown size={16} />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuRadioGroup value={type} onValueChange={setType}>
            <DropdownMenuRadioItem value="expense">
              Expense
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="income">Income</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <VictoryPie
        data={convertChartData(data)}
        colorScale={convertChartData(data).map((item: any) => item.color)}
        containerComponent={
          <VictoryContainer responsive={false} className="mx-auto" />
        }
        innerRadius={100}
        padAngle={2}
        height={200}
        width={200}
      />
      <br />
      {data.map((item) => (
        <div
          key={`${item.id}-${item.category}`}
          className="flex justify-between items-center mb-2"
        >
          <div className="flex gap-3 items-baseline">
            <div
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: item.color }}
            ></div>
            <span>{item.category}</span>
          </div>
          <span>{numberSeparator(item.value)}</span>
        </div>
      ))}
    </div>
  );
}
