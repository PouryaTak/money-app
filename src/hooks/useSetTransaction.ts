"use client"
import { DateContext } from "@/providers/date-provider"
import { addTransaction, updateTransaction as updateTransactionApi } from "@/functions/api/transactions"
import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { initialForm } from "@/helpers/static-data"
import { prepareNewData } from "@/functions/transactions"
import useTransactionStore from "@/store/useTransactionStore"
import useRouterHandler from "./useRouterHandler"

export default function useSetTransaction() {
    const { router } = useRouterHandler()
    const { selectedDate } = useContext(DateContext)
    const {
        currentTransaction,
        actions: { updateTransaction },
    } = useTransactionStore((state) => state)
    const queryClient = useQueryClient()

    const onSuccess = () => {
        queryClient.invalidateQueries(["transactions", { selectedDate }])
        updateTransaction(initialForm)
        router.back()
    }

    const mutationFn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const transaction = prepareNewData(currentTransaction)
        return transaction._id ? updateTransactionApi(transaction._id, transaction) : addTransaction(transaction)
    }

    const response = useMutation({
        mutationFn,
        onSuccess,
    })

    return response
}
