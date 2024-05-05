"use client"
import { DateContext } from "@/providers/date-provider"
import { calculateAmountByType } from "@/functions/statistics"
import React, { useContext, useMemo } from "react"
import { DictionaryContext } from "@/providers/dictionary-provider"
import BalanceView from "./balance-view"
import useTransactions from "@/hooks/useTransactions"
import useFilteredTransactions from "@/hooks/useFilteredTransactions"

export default function Balance() {
    const { selectedDate } = useContext(DateContext)
    const { dictionary } = useContext(DictionaryContext)
    const { data: transactions, isLoading, isError }: any = useTransactions()
    const { filteredTransactions } = useFilteredTransactions(transactions?.data)

    const calcExpenses = useMemo(
        () =>
            transactions
                ? calculateAmountByType(selectedDate.startDate, selectedDate.endDate, filteredTransactions, "expense")
                : 0,
        [filteredTransactions, selectedDate.endDate, selectedDate.startDate, transactions]
    )
    const calcIncomes = useMemo(
        () =>
            transactions
                ? calculateAmountByType(selectedDate.startDate, selectedDate.endDate, filteredTransactions, "income")
                : 0,
        [filteredTransactions, selectedDate.endDate, selectedDate.startDate, transactions]
    )

    const gradientPosition = useMemo(() => {
        const totalValue = calcIncomes + calcExpenses
        return totalValue == 0 ? null : (calcIncomes * 100) / totalValue
    }, [calcExpenses, calcIncomes])

    return (
        <BalanceView
            isLoading={isLoading}
            dictionary={dictionary}
            calcExpenses={calcExpenses}
            calcIncomes={calcIncomes}
            gradientPosition={gradientPosition}
        />
    )
}
