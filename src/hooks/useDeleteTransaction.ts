"use client"
import { DateContext } from "@/providers/date-provider"
import { deleteTransaction } from "@/functions/api/transactions"
import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { Transaction } from "@/types/transaction"

export default function useDeleteTransaction() {
    const { selectedDate } = useContext(DateContext)
    const queryClient = useQueryClient()
    let selectedId = ''

    const onSuccess = () => {
        queryClient.setQueryData(["transactions", { selectedDate }], (oldData: any) => {
            const data = oldData.data.filter((t: Transaction) => t.id !== selectedId)
            return { data }
        })
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
