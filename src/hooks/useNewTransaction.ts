"use client"
import { useContext } from "react"
import { TransactionContext } from "@/providers/transaction-provider"
import { addCommas, removeNonNumeric } from "@/lib/utils"

export default function useNewTransaction() {
    const { currentTransaction, setCurrentTransaction } = useContext(TransactionContext)

    const onOptionChange = (value: any, key: keyof typeof currentTransaction) => {
        setCurrentTransaction((current: any) => {
            const currentClone = { ...current }
            currentClone[key] = key == "amount" ? addCommas(removeNonNumeric(value)) : value
            return currentClone
        })
    }

    return {onOptionChange, currentTransaction}
}
