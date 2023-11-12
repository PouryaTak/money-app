"use client"
import React, { useContext, useMemo } from "react"
import { TransactionContext } from "@/providers/transaction-provider"
import { DrawerContext } from "@/providers/drawer-provider"
import { deleteTransaction } from "@/functions/api/transactions"
import { Transaction } from "@/types/transaction"
import TransactionList from "@/components/transaction-list/transaction-list"
import { DictionaryContext } from "@/providers/dictionary-provider"
import useTransactions from "@/hooks/useTransactions"

export default function TransactionListContainer() {
    const { setIsDrawerOpen } = useContext(DrawerContext)
    const { dictionary } = useContext(DictionaryContext)
    const { deleteStoreTransaction, setCurrentTransaction } = useContext(TransactionContext)
    const { data:transactions, isLoading, isError }: any = useTransactions()

    const sortedTransactions = useMemo(() => {
        return transactions ? transactions.data.sort((a: any, b: any) => (a.date > b.date ? -1 : 1)) : []
    }, [transactions])

    const handleEditTransaction = (transaction: Transaction) => {
        setCurrentTransaction(transaction)
        setIsDrawerOpen(true)
    }

    const handleDeleteTransaction = (transaction: Transaction) => {
        if (transaction._id) {
            deleteTransaction(transaction._id).then((res: any) => deleteStoreTransaction(transaction.id))
        }
    }
    return (
        <TransactionList
            isError={isError}
            isLoading={isLoading}
            sortedTransactions={sortedTransactions}
            handleEdit={handleEditTransaction}
            handleDelete={handleDeleteTransaction}
            dictionary={dictionary}
        />
    )
}
