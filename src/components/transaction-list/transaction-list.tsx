"use client"
import React from "react"
import { TransactionListProps } from "@/types/transaction"
import TransactionListItem from "@/components/transaction-list/transaction-item"
import TransactionLoading from "@/components/transaction-list/transaction-loading"

const ListWrapper = ({ children, isCenter = false }: { children: React.ReactElement; isCenter?: boolean }) => {
    return (
        <div className={`flex flex-col gap-2 my-3 h-full overflow-y-auto ${isCenter && "justify-center items-center"}`}>
            {children}
        </div>
    )
}

export default function TransactionList({
    status,
    sortedTransactions,
    handleEdit,
    handleDelete,
    dictionary,
}: TransactionListProps) {
    if (status === "error")
        return (
            <ListWrapper isCenter>
                <span>{dictionary.general.error}</span>
            </ListWrapper>
        )
    if (status === "loading")
        return (
            <ListWrapper>
                <TransactionLoading />
            </ListWrapper>
        )
    if (Boolean(sortedTransactions?.length))
        return (
            <ListWrapper>
                <>
                    {sortedTransactions.map((i: any) => (
                        <TransactionListItem
                            transaction={i}
                            key={i.id}
                            handleEditTransaction={handleEdit}
                            handleDeleteTransaction={handleDelete}
                            dictionary={dictionary}
                        />
                    ))}
                </>
            </ListWrapper>
        )
    return (
        <ListWrapper isCenter>
            <span>No data</span>
        </ListWrapper>
    )
}
