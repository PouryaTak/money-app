import React, { useContext } from "react"
import { useQuery } from "react-query"
import { getTransactionDetail } from "@/functions/api/transactions"
import useTransactionForm from "@/hooks/useTransactionForm"
import { categories } from "@/helpers/static-data"
import Icon from "../ui/icons"
import { numberSeparator } from "@/functions/handle-numbers"
import { Button } from "../ui/button"
import { PencilLine, Trash2 } from "lucide-react"
import useDeleteTransaction from "@/hooks/useDeleteTransaction"
import { Transaction } from "@/types/transaction"
import useDrawerStore from "@/store/useDrawerStore"
import { DictionaryContext } from "@/providers/dictionary-provider"
import { SettingsContext } from "@/providers/settings-provider"
import useTransactionStore from "@/store/useTransactionStore"
import moment from "moment-jalaali"

const TransactionDetails = () => {
    const { currentTransaction } = useTransactionForm()
    const { setQuery } = useDrawerStore((state) => state.actions)
    const { dictionary } = useContext(DictionaryContext)
    const { settings } = useContext(SettingsContext)
    const { updateTransaction } = useTransactionStore((state) => state.actions)

    
    const { data, isError, isLoading } = useQuery({
        queryKey: ["getTransactionDetails", currentTransaction._id],
        queryFn: () => getTransactionDetail( currentTransaction._id!)
    })

    const { mutate: handleDeleteTransaction } = useDeleteTransaction()

    const handleEditTransaction = (transaction: Transaction) => {
        updateTransaction(transaction)
        setQuery("transactionForm")
    }

    const datePrefix = settings.calender == "jalali" ? "j" : ""

    if (isLoading) {
        return <div className="w-full p-5 flex justify-center items-center">Loading...</div>
    }

    if (isError || data === undefined) {
        return <div className="w-full p-5 flex justify-center items-center">Error</div>
    }

    return (
        <>
            <div className="flex gap-2 justify-end -mt-9 mb-10">
                <Button
                    variant={"secondary"}
                    onClick={() => handleEditTransaction(data.transaction)}
                    className="text-gray-500"
                >
                    <PencilLine size={16} aria-hidden />
                    <span className="sr-only">{dictionary.pages.home["edit-transaction"]}</span>
                </Button>
                <Button
                    variant={"secondary"}
                    onClick={() => handleDeleteTransaction(data.transaction)}
                    className="text-red-500"
                >
                    <Trash2 size={16} aria-hidden />
                    <span className="sr-only">{dictionary.pages.home["delete-transaction"]}</span>
                </Button>
            </div>
            <div className="flex flex-col items-center justify-center  mb-5">
                <div
                    className={`w-12 h-12 flex items-center mb-4 justify-center rounded-lg ${
                        data.transaction.type == "expense" ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"
                    }`}
                    aria-hidden
                >
                    <Icon name={categories[data.transaction.type][data.transaction.category]?.icon} size={16} />
                </div>
                <h2 className="text-center font-semibold">{data.transaction.title}</h2>
            </div>
            <div
                className="[&>h2]:font-semibold [&>p]:mb-3 [&>p]:ml-3 bg-slate-100 p-5 rounded-lg"
                dir={dictionary.html.dir}
            >
                <h2>{dictionary.details.amount}</h2>
                <p>
                    {numberSeparator(Number(data.transaction.amount)) || "0"}
                    <span className="text-slate-300 text-sm leading-6 ms-2">{settings.currency} </span>
                </p>
                <h2>{dictionary.details.date}</h2>
                <p>
                    {moment(data.transaction.date).format(`${datePrefix}YYYY-${datePrefix}MM-${datePrefix}DD`) || "-"}
                </p>
                <h2>{dictionary.details.category}</h2>

                <p>
                    {data.transaction.category}-
                    {data.transaction.type === "expense" ? dictionary.details.expense : dictionary.details.income}
                </p>
                <h2>{dictionary.details.description}</h2>
                <p>{data.transaction.desc || ""}</p>
            </div>
            <div className="flex items-center justify-start text-xs gap-2 py-2 px-5 italic" dir={dictionary.html.dir}>
                <span>{dictionary.details["updated-at"]}:</span>
                <span>
                    {moment(data.transaction.updatedAt!).format(`${datePrefix}YYYY-${datePrefix}MM-${datePrefix}DD`) ||
                        "-"}
                </span>
            </div>
        </>
    )
}

export default TransactionDetails
