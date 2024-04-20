"use client"
import { DateContext } from "@/providers/date-provider"
import { deleteTransaction } from "@/functions/api/transactions"
import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { Transaction } from "@/types/transaction"
import useDrawerStore from "@/store/useDrawerStore"

export default function useDeleteTransaction() {
    const { selectedDate } = useContext(DateContext)
    const { setIsDrawerOpen, setQuery } = useDrawerStore((state) => state.actions)
    const queryClient = useQueryClient()
    let selectedId = ''

    const onSuccess = () => {
        queryClient.invalidateQueries(["transactions", { selectedDate }])
        setQuery("")
        setIsDrawerOpen(false)
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
