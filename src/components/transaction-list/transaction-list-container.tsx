"use client"
import React, { useCallback, useContext, useMemo, useState } from "react"
import { Transaction } from "@/types/transaction"
import TransactionList from "@/components/transaction-list/transaction-list"
import { DictionaryContext } from "@/providers/dictionary-provider"
import useTransactions from "@/hooks/useTransactions"
import useDrawerStore from "@/store/useDrawerStore"
import { SettingsContext } from "@/providers/settings-provider"
import useTransactionStore from "@/store/useTransactionStore"
import { Button } from "@/components/ui/button"
import { ArrowDown01, ArrowUp10, Calendar, DollarSign, Filter } from "lucide-react"
import useFilterStore from "@/store/useFilterStore"
import useFilteredTransactions from "@/hooks/useFilteredTransactions"

export default function TransactionListContainer() {
    const { setIsDrawerOpen, setQuery } = useDrawerStore((state) => state.actions)
    const { type, categories, tags } = useFilterStore((state) => state)
    const { dictionary } = useContext(DictionaryContext)
    const { settings } = useContext(SettingsContext)
    const { updateTransaction } = useTransactionStore((state) => state.actions)
    const { data: transactions, isLoading, isError }: any = useTransactions()

    const { filteredTransactions } = useFilteredTransactions(transactions?.data || [])

    const sortKeys = [
        { title: "date", icon: <Calendar className="text-primary" /> },
        { title: "amount", icon: <DollarSign className="text-primary" /> },
    ] as const
    const [currentSort, setCurrentSort] = useState<"date" | "amount">("date")
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC")
    const sortFunction = useCallback(
        (a: any, b: any) => {
            const direction = sortDirection === "ASC" ? 1 : -1
            if (currentSort === "amount") {
                return Number(a[currentSort]) > Number(b[currentSort]) ? -1 * direction : 1 * direction
            }
            return a[currentSort] > b[currentSort] ? -1 * direction : 1 * direction
        },
        [currentSort, sortDirection]
    )
    const sortedTransactions = useMemo(() => {
        return filteredTransactions ? filteredTransactions.sort(sortFunction) : []
    }, [sortFunction, filteredTransactions])

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
                <div className="flex justify-between">
                    <div className="px-5 pt-3 flex items-center">
                        <div className="flex justify-end border border-primary/50 rounded-lg">
                            {sortKeys.map((i) => (
                                <Button
                                    key={i.title}
                                    variant="ghost"
                                    size={"icon"}
                                    className={`${i.title === currentSort ? "bg-primary/15" : ""}`}
                                    onClick={() => setCurrentSort(i.title)}
                                >
                                    {i.icon}
                                    <span className="sr-only">{i.title}</span>
                                </Button>
                            ))}
                        </div>

                        <Button
                            variant="ghost"
                            size={"icon"}
                            className="bg-primary/15 text-primary mx-2"
                            onClick={() => setSortDirection((current) => (current === "ASC" ? "DESC" : "ASC"))}
                        >
                            {sortDirection === "ASC" ? <ArrowUp10 /> : <ArrowDown01 />}
                            <span className="sr-only">{sortDirection === "ASC" ? "ascending" : "descending"}</span>
                        </Button>
                    </div>

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
                </div>
            )}
            <TransactionList
                isError={isError}
                isLoading={isLoading}
                sortedTransactions={sortedTransactions}
                dictionary={dictionary}
                settings={settings}
                getTransactionDetails={getTransactionDetails}
            />
        </>
    )
}
