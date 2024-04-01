"use client"
import { DateContext } from "@/providers/date-provider"
import { GroupTransactionsByTypeCategoryReturn, groupTransactionsByTypeCategory } from "@/functions/statistics"
import React, { Suspense, useContext, useMemo } from "react"
import { DictionaryContext } from "@/providers/dictionary-provider"
import dynamic from "next/dynamic"
import { SettingsContext } from "@/providers/settings-provider"
import useTransactions from "@/hooks/useTransactions"

const ChartView = dynamic(() => import("./chart"))
const sort = (a: any, b: any) => (a.amount > b.amount ? -1 : 1)

export default function ChartContainer() {
    const { selectedDate } = useContext(DateContext)
    const { dictionary } = useContext(DictionaryContext)
    const { settings } = useContext(SettingsContext)
    const { data: transactions, isLoading, isError }: any = useTransactions()

    const categorizedObject: GroupTransactionsByTypeCategoryReturn = useMemo(() => {
        return transactions
            ? groupTransactionsByTypeCategory(selectedDate.startDate, selectedDate.endDate, transactions.data)
            : { expense: {}, income: {} }
    }, [selectedDate.endDate, selectedDate.startDate, transactions])

    const expenseData = Object.values(categorizedObject["expense"]).sort(sort)
    const incomeData = Object.values(categorizedObject["income"]).sort(sort)

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
