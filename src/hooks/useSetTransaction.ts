"use client"
import { DateContext } from "@/providers/date-provider"
import { addTransaction, updateTransaction as updateTransactionApi } from "@/functions/api/transactions"
import { useContext } from "react"
import { useMutation, useQueryClient } from "react-query"
import { initialForm } from "@/helpers/static-data"
import { prepareNewData } from "@/functions/transactions"
import { Transaction } from "@/types/transaction"
import useDrawerStore from "@/store/useDrawerStore"
import useTransactionStore from "@/store/useTransactionStore"

export default function useSetTransaction() {
    const { selectedDate } = useContext(DateContext)
    const { setIsDrawerOpen } = useDrawerStore((state) => state.actions)
    const {
        currentTransaction,
        actions: { updateTransaction },
    } = useTransactionStore((state) => state)
    const queryClient = useQueryClient()

    const onSuccess = () => {
        updateTransaction(initialForm)
        setIsDrawerOpen(false)
        queryClient.setQueryData(["transactions", { selectedDate }], (oldData: any) => {
            if (currentTransaction?._id && oldData?.data) {
                const newData = oldData.data.map((transaction: Transaction) => {
                    if (transaction._id === currentTransaction._id) {
                        return currentTransaction
                    }
                    return transaction
                })
                return { data: [...newData] }
            }
            return { data: [currentTransaction, ...oldData.data] }
        })
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
