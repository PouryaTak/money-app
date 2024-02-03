"use client"
import { DateContext } from "@/providers/date-provider"
import { addTransaction, updateTransaction } from "@/functions/api/transactions"
import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { initialForm } from "@/helpers/static-data"
import { TransactionContext } from "@/providers/transaction-provider"
import { prepareNewData } from "@/functions/transactions"
import { Transaction } from "@/types/transaction"
import useDrawerStore from "../../store/useDrawerStore"

export default function useSetTransaction() {
    const { selectedDate } = useContext(DateContext)
    const { setIsDrawerOpen } = useDrawerStore((state) => state.actions)
    const { currentTransaction, setCurrentTransaction } = useContext(TransactionContext)
    const transaction = prepareNewData(currentTransaction)
    const queryClient = useQueryClient()

    const onSuccess = () => {
        setCurrentTransaction(initialForm)
        setIsDrawerOpen(false)
        queryClient.setQueryData(["transactions", { selectedDate }], (oldData: any) => {
            if(transaction._id){
                const index = oldData.data.findIndex((t: Transaction) => t._id === transaction._id)
                oldData.data[index] = transaction
                return { data: [...oldData.data] }
            } 
            return { data: [transaction, ...oldData.data] }
        })
    }

    const mutationFn = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        return transaction._id ? updateTransaction(transaction._id, transaction) : addTransaction(transaction)
    }


    const response = useMutation({
        mutationFn,
        onSuccess,
    })

    return response
}
