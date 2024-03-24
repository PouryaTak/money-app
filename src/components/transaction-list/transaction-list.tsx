"use client"
import React, { FC } from "react"
import { TransactionListProps } from "@/types/transaction"
import TransactionListItem from "@/components/transaction-list/transaction-item"
import TransactionLoading from "@/components/transaction-list/transaction-loading"
import Image from "next/image"

interface ListWrapperProps {
    children: React.ReactElement;
    className?: string
}
const ListWrapper: FC<ListWrapperProps> = ({ children, className }) => {
    return (
        <div className={`flex flex-col gap-2 min-h-full h-max px-5 ${className}`}>
            {children}
        </div>
    )
}

export default function TransactionList({
    isError,
    isLoading,
    sortedTransactions,
    getTransactionDetails,
    dictionary,
    settings
}: TransactionListProps) {
    if (isError)
        return (
            <ListWrapper className="justify-center items-center">
                <span>{dictionary.general.error}</span>
            </ListWrapper>
        )
    if (isLoading)
        return (
            <ListWrapper className="py-5">
                <TransactionLoading />
            </ListWrapper>
        )
    if (Boolean(sortedTransactions?.length))
        return (
            <ListWrapper className="py-5">
                <>
                    {sortedTransactions.map((i: any) => (
                        <TransactionListItem
                            transaction={i}
                            key={i.id}
                            getTransactionDetails={getTransactionDetails}
                            dictionary={dictionary}
                            datePrefix={settings.calender == "jalali" ? "j" : ""}
                            currency={settings.currency}
                        />
                    ))}
                </>
            </ListWrapper>
        )
    return (
        <ListWrapper className="justify-center items-center">
            <div className="flex flex-col items-center">
                <Image src="/wallet.svg" alt="wallet graphic image" width={190} height={172} className="grayscale opacity-40" />
                <span className="text-lg font-bold text-gray-300">{dictionary["pages"]["home"]["no-transaction"]}</span>
            </div>
        </ListWrapper>
    )
}
