import React from "react"
import { ChartProps } from "@/types/general"
import ChartSection from "./chart-section"

export default function ChartView({ expenseData,incomeData, isLoading, currency, dictionary }: ChartProps) {
    return (
        <div className="h-full overflow-y-auto p-5">
            {isLoading && (
                <div className="w-[140px] h-[140px] rounded-full border-[20px] border-slate-200 animate-pulse mx-auto"></div>
            )}
            <ChartSection title={dictionary["general"]["expenses"]} chartData={expenseData} currency={currency} />
            <hr className="border-dashed my-5" />
            <ChartSection title={dictionary["general"]["incomes"]} chartData={incomeData} currency={currency} />
        </div>
    )
}
