"use client"
import React from "react"
import TransactionForm from "./transaction-form"
import useSetTransaction from "@/hooks/useSetTransaction"
import useTransactionForm from "@/hooks/useTransactionForm"
import useRouterHandler from "@/hooks/useRouterHandler"

export default function TransactionFormContainer() {
    const {isLoading, mutate} = useSetTransaction()
    const {onOptionChange, currentTransaction} = useTransactionForm()
    const { handleSearchParams } = useRouterHandler()
    

    const onAddNewTagButtonClick = () => {
        // add query to drawer store
        handleSearchParams("drawer","addTagForm")
    }
  
    return (
        <TransactionForm
            currentTransaction={currentTransaction}
            onOptionChange={onOptionChange}
            saveTransactionHandler={mutate}
            isLoading={isLoading}
            onAddNewTagButtonClick={onAddNewTagButtonClick}
        />
    )
}
