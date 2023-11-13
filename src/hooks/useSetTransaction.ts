"use client"
import { DateContext } from "@/providers/date-provider"
import { addTransaction, updateTransaction } from "@/functions/api/transactions"
import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { DrawerContext } from "@/providers/drawer-provider"
import { initialForm } from "@/helpers/static-data"
import { TransactionContext } from "@/providers/transaction-provider"
import { prepareNewData } from "@/functions/transactions"

export default function useSetTransaction() {
    const { selectedDate } = useContext(DateContext)
    const { setIsDrawerOpen } = useContext(DrawerContext)
    const { currentTransaction, setCurrentTransaction } = useContext(TransactionContext)
    const transaction = prepareNewData(currentTransaction)
    const queryClient = useQueryClient()

    const onSuccess = () => {
        setCurrentTransaction(initialForm)
        setIsDrawerOpen(false)
        queryClient.setQueryData(["transactions", { selectedDate }], (oldData: any) => {
            return { data: [transaction, ...oldData.data] }
        })
    }

    const mutationFn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        return transaction.id ? updateTransaction(transaction.id, transaction) : addTransaction(transaction)
    }


    const response = useMutation({
        mutationFn,
        onSuccess,
    })

    return response
}
