import React, { useContext } from "react"
import TypeTabs from "../transaction-form/type-tabs"
import { DictionaryContext } from "@/providers/dictionary-provider"
import { Button } from "../ui/button"
import { queryClient } from "@/providers/provider-container"
import useTransactions from "@/hooks/useTransactions"
import useFilterStore from "@/store/useFilterStore"
import useDrawerStore from "@/store/useDrawerStore"

const TransactionFilter = () => {
    const { dictionary } = useContext(DictionaryContext)
    const { isLoading }: any = useTransactions()
    const { setIsDrawerOpen, setQuery } = useDrawerStore((state) => state.actions)
    const { actions, type, categories } = useFilterStore((state) => state)
    const typeTabValues = [
        {
            value: "all",
            label: dictionary.general.all as string,
        },
        {
            value: "income",
            label: dictionary.general.income as string,
        },
        {
            value: "expense",
            label: dictionary.general.expense as string,
        },
    ]

    const applyFilter = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        queryClient.invalidateQueries("transactions")
        setIsDrawerOpen(false)
        setQuery("")
    }

    return (
        <form onSubmit={applyFilter} className="flex flex-col gap-3">
            <TypeTabs
                isLoading={isLoading}
                currentValue={type}
                onOptionChange={actions.setType}
                values={typeTabValues}
            />
            {/* !TODO add category filter here */}
            <Button>{dictionary.general["apply-filter"]}</Button>
        </form>
    )
}

export default TransactionFilter
