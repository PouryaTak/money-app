"use client"
import { DateContext } from "@/providers/date-provider"
import { deleteTransaction } from "@/functions/api/transactions"
import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { Transaction } from "@/types/transaction"
import useRouterHandler from "./useRouterHandler"

export default function useDeleteTransaction() {
    const { selectedDate } = useContext(DateContext)
    const { router } = useRouterHandler()
    const queryClient = useQueryClient()
    let selectedId = ''

    const onSuccess = () => {
        queryClient.invalidateQueries(["transactions", { selectedDate }])
        router.back()
    }

    const mutationFn = (transaction:Transaction) => {
        selectedId = transaction.id
        return transaction._id ? deleteTransaction(transaction._id) : deleteTransaction(transaction.id)
    }


    const response = useMutation({
        mutationFn,
        onSuccess,
        
    })

    return response
}
