"use client"
import React, { useContext, useMemo } from "react"
import { Transaction } from "@/types/transaction"
import TransactionList from "@/components/transaction-list/transaction-list"
import { DictionaryContext } from "@/providers/dictionary-provider"
import useTransactions from "@/hooks/useTransactions"
import useDeleteTransaction from "@/hooks/useDeleteTransaction"
import useDrawerStore from "@/store/useDrawerStore"
import { SettingsContext } from "@/providers/settings-provider"
import useTransactionStore from "@/store/useTransactionStore"

export default function TransactionListContainer() {
    const { setIsDrawerOpen, setQuery } = useDrawerStore((state) => state.actions)
    const { dictionary } = useContext(DictionaryContext)
    const { settings } = useContext(SettingsContext)
    const { updateTransaction } = useTransactionStore((state) => state.actions)
    const { data: transactions, isLoading, isError }: any = useTransactions()
    const sortedTransactions = useMemo(() => {
        return transactions ? transactions.data.sort((a: any, b: any) => (a.date > b.date ? -1 : 1)) : []
    }, [transactions])

    const { mutate: handleDeleteTransaction } = useDeleteTransaction()

    const handleEditTransaction = (transaction: Transaction) => {
        updateTransaction(transaction)
        setQuery("transactionForm")
        setIsDrawerOpen(true)
    }

    const getTransactionDetails = (id: string) => {
        updateTransaction({ _id: id } as Transaction)
        setQuery("transactionDetails")
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
            getTransactionDetails={getTransactionDetails}
        />
    )
}
