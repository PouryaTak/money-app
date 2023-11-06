import React from "react"
import { ChartProps } from "@/types/general"
import ChartSection from "./chart-section"

export default function ChartView({ expenseData,incomeData, isLoading }: ChartProps) {
    return (
        <div className="h-full overflow-y-auto p-5">
            {isLoading && (
                <div className="w-[140px] h-[140px] rounded-full border-[20px] border-slate-200 animate-pulse mx-auto"></div>
            )}
            <ChartSection title="Expenses" chartData={expenseData} />
            <hr className="border-dashed my-5" />
            <ChartSection title="Incomes" chartData={incomeData} />
        </div>
    )
}
