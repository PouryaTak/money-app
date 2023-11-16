"use client"
import { initialForm } from "@/helpers/static-data"
import { Transaction } from "@/types/transaction"
import { createContext, useState } from "react"

export const TransactionContext = createContext<any>({})
export default function TransactionProvider({ children }: any) {
    const [currentTransaction, setCurrentTransaction] = useState<Transaction>(initialForm)
    return (
        <TransactionContext.Provider
            value={{
                currentTransaction,
                setCurrentTransaction,
            }}
        >
            {children}
        </TransactionContext.Provider>
    )
}
