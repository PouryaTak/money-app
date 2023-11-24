"use client"
import React from "react"
import TransactionForm from "./transaction-form"
import useSetTransaction from "@/hooks/useSetTransaction"
import useTransactionForm from "@/hooks/useTransactionForm"

export default function TransactionFormContainer() {
    const {isLoading, mutate} = useSetTransaction()
    const {onOptionChange, currentTransaction} = useTransactionForm()
  
    return (
        <TransactionForm
            currentTransaction={currentTransaction}
            onOptionChange={onOptionChange}
            saveTransactionHandler={mutate}
            isLoading={isLoading}
        />
    )
}
