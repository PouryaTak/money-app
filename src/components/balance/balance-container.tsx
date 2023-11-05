"use client"
import { DateContext } from "@/context/date-provider"
import { TransactionContext } from "@/context/transaction-provider"
import { calculateAmountByType } from "@/functions/statistics"
import React, { useContext, useMemo } from "react"
import { DictionaryContext } from "@/context/dictionary-provider"
import BalanceView from "./balance-view"

export default function Balance() {
    const { transactions } = useContext(TransactionContext)
    const { selectedDate } = useContext(DateContext)
    const { dictionary } = useContext(DictionaryContext)
    const calcExpenses = useMemo(
        () => calculateAmountByType(selectedDate.startDate, selectedDate.endDate, transactions, "expense"),
        [selectedDate.endDate, selectedDate.startDate, transactions]
    )
    const calcIncomes = useMemo(
        () => calculateAmountByType(selectedDate.startDate, selectedDate.endDate, transactions, "income"),
        [selectedDate.endDate, selectedDate.startDate, transactions]
    )

    const gradientPosition = useMemo(() => {
        const totalValue = calcIncomes + calcExpenses
        return totalValue == 0 ? null : ((calcIncomes * 100) / totalValue)
    }, [calcExpenses, calcIncomes])

    console.log("00000000", calcExpenses, calcIncomes, gradientPosition)

    return (
        <BalanceView
            dictionary={dictionary}
            calcExpenses={calcExpenses}
            calcIncomes={calcIncomes}
            gradientPosition={gradientPosition}
        />
    )
}
