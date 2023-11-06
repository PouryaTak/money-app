"use client"
import { DateContext } from "@/context/date-provider"
import { TransactionContext } from "@/context/transaction-provider"
import { groupTransactionsByTypeCategory } from "@/functions/statistics"
import React, { useContext, useMemo } from "react"
import { DictionaryContext } from "@/context/dictionary-provider"
import dynamic from "next/dynamic"

const ChartView = dynamic(() => import("./chart"))

export default function ChartContainer() {
    const { transactions, transactionsStatus } = useContext(TransactionContext)
    const { selectedDate } = useContext(DateContext)
    const { dictionary } = useContext(DictionaryContext)

    const data = useMemo(
        () =>
            groupTransactionsByTypeCategory(selectedDate.startDate, selectedDate.endDate, transactions, "expense").sort(
                (a, b) => (a.amount > b.amount ? -1 : 1)
            ),
        [selectedDate.endDate, selectedDate.startDate, transactions]
    )

    const expenseData = data.filter((i) => i.type === "expense")
    const incomeData = data.filter((i) => i.type === "income")

    return (
        <ChartView
            dictionary={dictionary}
            expenseData={expenseData}
            incomeData={incomeData}
            isLoading={transactionsStatus === "loading"}
        />
    )
}
