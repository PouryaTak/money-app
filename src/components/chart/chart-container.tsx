"use client"
import { DateContext } from "@/providers/date-provider"
import { groupTransactionsByTypeCategory } from "@/functions/statistics"
import React, { Suspense, useContext, useMemo } from "react"
import { DictionaryContext } from "@/providers/dictionary-provider"
import dynamic from "next/dynamic"
import { SettingsContext } from "@/providers/settings-provider"
import useTransactions from "@/hooks/useTransactions"

const ChartView = dynamic(() => import("./chart"))

export default function ChartContainer() {
    const { selectedDate } = useContext(DateContext)
    const { dictionary } = useContext(DictionaryContext)
    const { settings } = useContext(SettingsContext)
    const { data: transactions, isLoading, isError }: any = useTransactions()

    const groupedData = useMemo(() => {
        return transactions
            ? groupTransactionsByTypeCategory(selectedDate.startDate, selectedDate.endDate, transactions.data).sort(
                  (a, b) => (a.amount > b.amount ? -1 : 1)
              )
            : []
    }, [selectedDate.endDate, selectedDate.startDate, transactions])

    const expenseData = groupedData.filter((i) => i.type === "expense")
    const incomeData = groupedData.filter((i) => i.type === "income")

    return (
        <Suspense fallback={<span>Loading...</span>}>
            <ChartView
                dictionary={dictionary}
                expenseData={expenseData}
                incomeData={incomeData}
                isLoading={isLoading}
                currency={settings.currency}
            />
        </Suspense>
    )
}
