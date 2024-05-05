import useFilterStore from "@/store/useFilterStore"
import { Transaction } from "@/types/transaction"
import { useMemo } from "react"

const useFilteredTransactions = (transactions: Transaction[]) => {
    const { type, categories, tags } = useFilterStore((state) => state)

    const filteredTransactions = useMemo(() => {
        return transactions?.filter(
            (transaction: Transaction) =>
                (type === "all" ? true : transaction.type === type) &&
                (categories.length ? categories.includes(transaction.category) : true) &&
                (tags.length ? tags.every((tag: string) => transaction.tags.includes(tag)) : true)
        )
    }, [categories, tags, transactions, type])

    return {filteredTransactions}
}

export default useFilteredTransactions
