"use client"
import { addCommas, removeNonNumeric } from "@/lib/utils"
import useTransactionStore from "../../store/useTransactionStore"

export default function useTransactionForm() {
    const {
        currentTransaction,
        actions: { updateTransaction },
    } = useTransactionStore((state) => state)

    const onOptionChange = (value: any, key: keyof typeof currentTransaction) => {
        const currentClone = { ...currentTransaction }
        currentClone[key] = key == "amount" ? addCommas(removeNonNumeric(value)) : value
        updateTransaction(currentClone)
    }

    return { onOptionChange, currentTransaction }
}
