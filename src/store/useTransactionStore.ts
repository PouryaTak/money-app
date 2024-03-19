import { initialForm } from "@/helpers/static-data"
import { Transaction } from "@/types/transaction"
import { create } from "zustand"

type State = {
    currentTransaction: Transaction
    actions: {
        updateTransaction: (currentTransaction: Transaction) => void
    }
}

const useTransactionStore = create<State>((set) => ({
    currentTransaction: initialForm,
    actions: {
        updateTransaction: (currentTransaction) => set(() => ({ currentTransaction })),
    },
}))

export default useTransactionStore
