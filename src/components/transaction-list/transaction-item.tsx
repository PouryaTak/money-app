import React, { memo } from "react"
import moment from "moment-jalaali"
import { numberSeparator } from "@/functions/handle-numbers"
import { categories } from "@/helpers/static-data"
import { Transaction } from "@/types/transaction"
import { Card } from "@/components/ui/card"
import Icon from "@/components/ui/icons"
import TransactionListItemPopover from "@/components/transaction-list/item-popover"

const TransactionListItem = ({
    transaction,
    handleEditTransaction,
    handleDeleteTransaction,
    dictionary,
    datePrefix,
    currency,
}: {
    transaction: Transaction
    handleEditTransaction: (transaction: Transaction) => void
    handleDeleteTransaction: (transaction: Transaction) => void
    dictionary: any
    datePrefix: "j" | ""
    currency: string
}) => {
    return (
        <Card className="flex gap-2 bg-white p-2 md:p-4 rounded-2xl pr-3">
            <div
                className={`w-12 h-16 flex items-center justify-center rounded-lg  ${
                    transaction.type == "expense" ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"
                }`}
            >
                <span aria-hidden>
                    <Icon name={categories[transaction.type][transaction.category]?.icon} size={16} />
                </span>
                <span className="sr-only">{dictionary.general[transaction.type]}</span>
            </div>
            <div className="grid grid-rows-2 w-full h-auto items-center">
                <div className="flex justify-between w-full items-center">
                    <span className="col-start-2 col-end-3 row-start-1 row-end-2 text-sm truncate">
                        {transaction.title || "0"}
                    </span>
                    <div className="col-start-3 col-end-4 row-start-1 row-end-2 truncate text-end text-xs">
                        {moment(transaction.date).format(`${datePrefix}MMMM ${datePrefix}DD`) || "-"}
                    </div>
                </div>
                <div className="flex justify-between w-full items-center">
                    <div className="col-start-2 col-end-3 row-start-2 row-end-3 truncate text-sm flex gap-2 text-slate-500">
                        {numberSeparator(Number(transaction.amount)) || "0"}
                        <span className="text-slate-300 text-sm leading-6">{currency} </span>
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

export default memo(TransactionListItem)
