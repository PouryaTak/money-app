"use client"
import React from "react"
import TransactionForm from "./transaction-form"
import useSetTransaction from "@/hooks/useSetTransaction"
import useNewTransaction from "@/hooks/useNewTransaction"

export default function TransactionFormContainer() {
    const {isLoading, mutate} = useSetTransaction()
    const {onOptionChange, currentTransaction} = useNewTransaction()
  
    return (
        <TransactionForm
            currentTransaction={currentTransaction}
            onOptionChange={onOptionChange}
            saveTransactionHandler={mutate}
            isLoading={isLoading}
        />
    )
}
