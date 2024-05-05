import React, { memo } from "react"
import moment from "moment-jalaali"
import { numberSeparator } from "@/functions/handle-numbers"
import { categories } from "@/helpers/static-data"
import { Transaction } from "@/types/transaction"
import { Card } from "@/components/ui/card"
import Icon from "@/components/ui/icons"
import { TagIcon, TextIcon } from "lucide-react"

const TransactionListItem = ({
    transaction,
    getTransactionDetails,
    dictionary,
    datePrefix,
    currency,
}: {
    transaction: Transaction
    getTransactionDetails: (id: string) => void
    dictionary: any
    datePrefix: "j" | ""
    currency: string
}) => {
    return (
        <Card
            className="flex gap-2 bg-white transition-all shadow-none hover:shadow-md cursor-pointer p-2 md:p-4 rounded-2xl pr-3"
            onClick={() => getTransactionDetails(transaction._id!)}
        >
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
                <div className="flex justify-between w-full items-center ">
                    <div className="flex items-center gap-2 col-start-2 col-end-3 row-start-1 row-end-2">
                        <span className=" text-sm truncate">{transaction.title || "-----"}</span>
                        {Boolean(transaction.desc) && <TextIcon size={12} className="text-gray-400" />}
                        {Boolean(transaction.tags.length) && <TagIcon size={12} className="text-gray-400" />}
                    </div>
                    <div className="col-start-3 col-end-4 row-start-1 row-end-2 truncate text-end text-xs">
                        {moment(transaction.date).format(`${datePrefix}MM/${datePrefix}DD`) || "--/--"}
                    </div>
                </div>
                <div className="flex justify-between w-full items-center">
                    <div className="col-start-2 col-end-3 row-start-2 row-end-3 truncate text-sm flex gap-2 text-slate-500">
                        {numberSeparator(Number(transaction.amount)) || "0"}
                        <span className="text-slate-300 text-sm leading-6">{currency} </span>
                    </div>
                    <div className="flex justify-end col-start-3 col-end-4 row-start-2 row-end-3 truncate text-end"></div>
                </div>
            </div>
        </Card>
    )
}

export default memo(TransactionListItem)
