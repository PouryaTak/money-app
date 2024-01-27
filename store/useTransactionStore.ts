import { initialForm } from '@/helpers/static-data'
import { Transaction } from '@/types/transaction'
import { create } from 'zustand'

type State = {
    currentTransaction: Transaction,
    updateFirstName: (currentTransaction: Transaction) => void
}

const usePersonStore = create<State>((set) => ({
    currentTransaction: initialForm,
    updateFirstName: (currentTransaction) => set(() => ({ currentTransaction })),
  }))

export default usePersonStore