import React, { useContext } from "react"
import TypeTabs from "../transaction-form/type-tabs"
import { DictionaryContext } from "@/providers/dictionary-provider"
import { Button } from "../ui/button"
import { queryClient } from "@/providers/provider-container"
import useTransactions from "@/hooks/useTransactions"
import useFilterStore from "@/store/useFilterStore"
import useDrawerStore from "@/store/useDrawerStore"
import { categories as CATEGORIES } from "@/helpers/static-data"
import Icon from "../ui/icons"

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

    const categoryArray =
        type === "all"
            ? Array.from(new Set([...Object.keys(CATEGORIES.expense), ...Object.keys(CATEGORIES.income)]))
            : Object.keys(CATEGORIES[type])

    return (
        <form onSubmit={applyFilter} className="flex flex-col gap-3">
            <span>{dictionary.general.type}</span>
            <TypeTabs
                isLoading={isLoading}
                currentValue={type}
                onOptionChange={actions.setType}
                values={typeTabValues}
            />
            {/* !TODO add category filter here */}
            <div className="flex justify-between items-center">
                <span>{dictionary.details.category}</span>
                <span className="text-sm text-gray-500">{categories.length} {dictionary.general.selected}</span>
            </div>
            <div className="flex flex-wrap gap-2 p-4 h-80 overflow-y-auto border border-gray-400 rounded-lg ">
                {categoryArray.map((category: any, index) => (
                    <div
                        key={category + index}
                        className={`flex self-start gap-2 items-center relative p-2 border rounded-lg ${
                            categories.includes(category) && "border-primary bg-white"
                        }`}
                        onClick={() => actions.toggleCategories(category)}
                    >
                        <Icon name={CATEGORIES["expense"][category]?.icon || CATEGORIES["income"][category]?.icon} />
                        {category}
                    </div>
                ))}
            </div>
            <Button>{dictionary.general["apply-filter"]}</Button>
        </form>
    )
}

export default TransactionFilter
