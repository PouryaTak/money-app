"use client";

import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { convertChartData, groupTransactionsByTypeCategory } from "@/functions/statistics";
import React, { useContext, useMemo } from "react";
import { VictoryContainer, VictoryPie } from "victory";

export default function Chart() {
  const { transactions } = useContext(TransactionContext);
  const { selectedDate } = useContext(DateContext);
  const data = useMemo(
    () => groupTransactionsByTypeCategory(selectedDate.startDate, selectedDate.endDate, transactions, "expense"),
    [selectedDate.endDate, selectedDate.startDate, transactions]
  );
  return (
    <div>
      {JSON.stringify(data)}
      <VictoryPie
        data={convertChartData(data)}
        colorScale={convertChartData(data).map((item:any)=> item.color)}
        containerComponent={<VictoryContainer responsive={false} className="mx-auto"/>}
        innerRadius={100}
        padAngle={2}
      />
    </div>
  );
}
