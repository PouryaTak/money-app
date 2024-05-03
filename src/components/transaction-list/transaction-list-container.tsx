"use client"
import React, { useContext, useMemo } from "react"
import { Transaction } from "@/types/transaction"
import TransactionList from "@/components/transaction-list/transaction-list"
import { DictionaryContext } from "@/providers/dictionary-provider"
import useTransactions from "@/hooks/useTransactions"
import useDrawerStore from "@/store/useDrawerStore"
import { SettingsContext } from "@/providers/settings-provider"
import useTransactionStore from "@/store/useTransactionStore"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import useFilterStore from "@/store/useFilterStore"

export default function TransactionListContainer() {
    const { setIsDrawerOpen, setQuery } = useDrawerStore((state) => state.actions)
    const { type, categories, tags } = useFilterStore((state) => state)
    const { dictionary } = useContext(DictionaryContext)
    const { settings } = useContext(SettingsContext)
    const { updateTransaction } = useTransactionStore((state) => state.actions)
    const { data: transactions, isLoading, isError }: any = useTransactions()
    const sortedTransactions = useMemo(() => {
        return transactions ? transactions.data.sort((a: any, b: any) => (a.date > b.date ? -1 : 1)) : []
    }, [transactions])

    const filterSortedTransaction = useMemo(() => {
        return sortedTransactions.filter(
            (transaction: Transaction) =>
                (type === "all" ? true : transaction.type === type) &&
                (categories.length ? categories.includes(transaction.category) : true) &&
                (tags.length ? tags.every((tag: string) => transaction.tags.includes(tag)) : true)
        )
    }, [categories, sortedTransactions, tags, type])

    const getTransactionDetails = (id: string) => {
        updateTransaction({ _id: id } as Transaction)
        setQuery("transactionDetails")
        setIsDrawerOpen(true)
    }

    const handleFilterClick = () => {
        setQuery("transactionFilter")
        setIsDrawerOpen(true)
    }

    return (
        <>
            {Boolean(transactions?.data.length) && (
                <div className="px-5 pt-3 flex justify-end">
                    <Button
                        variant={"ghost"}
                        size={"icon"}
                        className="bg-primary/15 relative"
                        onClick={handleFilterClick}
                    >
                        {Boolean(type !== "all" || categories.length || tags.length) && (
                            <div className="w-3 h-3 rounded-full bg-red-400 absolute -top-1 -right-1"></div>
                        )}
                        <Filter className="text-primary" />
                        <span className="sr-only">filters</span>
                    </Button>
                </div>
            )}
            <TransactionList
                isError={isError}
                isLoading={isLoading}
                sortedTransactions={filterSortedTransaction}
                dictionary={dictionary}
                settings={settings}
                getTransactionDetails={getTransactionDetails}
            />
        </>
    )
}
