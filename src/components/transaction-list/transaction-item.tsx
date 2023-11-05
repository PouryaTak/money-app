import React, { useCallback, useContext, useMemo } from "react"
import moment from "moment-jalaali"
import { numberSeparator } from "@/functions/handle-numbers"
import { categories } from "@/helpers/static-data"
import { Transaction } from "@/types/transaction"
import { Card } from "@/components/ui/card"
import Icon from "@/components/ui/icons"
import TransactionListItemPopover from "@/components/transaction-list/item-popover"
import { SettingsContext } from "@/context/settings-provider"

export default function TransactionListItem({
    transaction,
    handleEditTransaction,
    handleDeleteTransaction,
    dictionary,
}: {
    transaction: Transaction
    handleEditTransaction: (transaction: Transaction) => void
    handleDeleteTransaction: (transaction: Transaction) => void
    dictionary: any
}) {
    const { settings } = useContext(SettingsContext)
    const getCategory = useCallback((transaction: Transaction) => {
        if (!transaction.category) return "Home"
        return categories[transaction.type].find((item: any) => item.key == transaction.category)
    }, [])
    const isJalaliCalender = useMemo(() => (settings.calender == "jalali" ? "j" : ""), [settings.calender])
    const date = useMemo(() => moment(transaction.date), [transaction.date])

    return (
        <Card className="flex gap-2 bg-white p-2 md:p-4 rounded-2xl pr-3">
            <div
                className={`w-12 h-16 flex items-center justify-center rounded-lg  ${
                    transaction.type == "expense" ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"
                }`}
            >
                <span aria-hidden>
                    <Icon name={getCategory(transaction).icon} size={16} />
                </span>
                <span className="sr-only">{dictionary.general[transaction.type]}</span>
            </div>
            <div className="flex flex-col justify-around flex-1 h-full">
                <div className="flex justify-between w-full">
                    <span className="col-start-2 col-end-3 row-start-1 row-end-2 text-sm truncate">
                        {transaction.title || "0"}
                    </span>
                    <div className="col-start-3 col-end-4 row-start-1 row-end-2 truncate text-end text-xs">
                        {date.format(`${isJalaliCalender}MMMM ${isJalaliCalender}DD`) || "-"}
                    </div>
                </div>
                <div className="flex justify-between w-full">
                    <div className="col-start-2 col-end-3 row-start-2 row-end-3 truncate text-sm flex gap-2 text-slate-500">
                        {numberSeparator(Number(transaction.amount)) || "0"}
                        <span className="text-slate-300 text-sm leading-6">{settings.currency} </span>
                    </div>
                    <div className="flex justify-end col-start-3 col-end-4 row-start-2 row-end-3 truncate text-end">
                        <TransactionListItemPopover
                            dictionary={dictionary}
                            handleEditTransaction={() => handleEditTransaction(transaction)}
                            handleDeleteTransaction={() => handleDeleteTransaction(transaction)}
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}
