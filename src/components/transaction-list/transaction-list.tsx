"use client"
import React from "react"
import { TransactionListProps } from "@/types/transaction"
import TransactionListItem from "@/components/transaction-list/transaction-item"
import TransactionLoading from "@/components/transaction-list/transaction-loading"
import Image from "next/image"

const ListWrapper = ({ children, isCenter = false }: { children: React.ReactElement; isCenter?: boolean }) => {
    return (
        <div className={`flex flex-col gap-2 my-3 h-full px-5 overflow-y-auto ${isCenter && "justify-center items-center"}`}>
            {children}
        </div>
    )
}

export default function TransactionList({
    isError,
    isLoading,
    sortedTransactions,
    handleEdit,
    handleDelete,
    dictionary,
    settings
}: TransactionListProps) {
    if (isError)
        return (
            <ListWrapper isCenter>
                <span>{dictionary.general.error}</span>
            </ListWrapper>
        )
    if (isLoading)
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
                            datePrefix={settings.calender == "jalali" ? "j" : ""}
                            currency={settings.currency}
                        />
                    ))}
                </>
            </ListWrapper>
        )
    return (
        <ListWrapper isCenter>
            <div className="flex flex-col items-center">
                <Image src="/wallet.svg" alt="wallet graphic image" width={190} height={172} className="grayscale opacity-40" />
                <span className="text-lg font-bold text-gray-300">{dictionary["pages"]["home"]["no-transaction"]}</span>
            </div>
        </ListWrapper>
    )
}
