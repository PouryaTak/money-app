"use client"
import React from "react"
import TransactionForm from "./transaction-form"
import useSetTransaction from "@/hooks/useSetTransaction"
import useTransactionForm from "@/hooks/useTransactionForm"
import useDrawerStore from "@/store/useDrawerStore"

export default function TransactionFormContainer() {
    const {isLoading, mutate} = useSetTransaction()
    const {onOptionChange, currentTransaction} = useTransactionForm()
    const {setQuery} = useDrawerStore(state => state.actions)

    const onAddNewTagButtonClick = () => {
        // add query to drawer store
        setQuery("addTagForm")
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
