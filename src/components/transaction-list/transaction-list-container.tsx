"use client"
import React, { useContext, useMemo } from "react"
import { TransactionContext } from "@/providers/transaction-provider"
import { Transaction } from "@/types/transaction"
import TransactionList from "@/components/transaction-list/transaction-list"
import { DictionaryContext } from "@/providers/dictionary-provider"
import useTransactions from "@/hooks/useTransactions"
import useDeleteTransaction from "@/hooks/useDeleteTransaction"
import useDrawerStore from "../../../store/useDrawerStore"
import { SettingsContext } from "@/providers/settings-provider"

export default function TransactionListContainer() {
    const { setIsDrawerOpen, setQuery } = useDrawerStore((state) => state.actions)
    const { dictionary } = useContext(DictionaryContext)
    const { settings } = useContext(SettingsContext)
    const { setCurrentTransaction } = useContext(TransactionContext)
    const { data:transactions, isLoading, isError }: any = useTransactions()
    const sortedTransactions = useMemo(() => {
        return transactions ? transactions.data.sort((a: any, b: any) => (a.date > b.date ? -1 : 1)) : []
    }, [transactions])

    const {mutate:handleDeleteTransaction} = useDeleteTransaction()

    const handleEditTransaction = (transaction: Transaction) => {
        setCurrentTransaction(transaction)
        setQuery("transactionForm")
        setIsDrawerOpen(true)
    }

    return (
        <TransactionList
            isError={isError}
            isLoading={isLoading}
            sortedTransactions={sortedTransactions}
            handleEdit={handleEditTransaction}
            handleDelete={handleDeleteTransaction}
            dictionary={dictionary}
            settings={settings}
        />
    )
}
