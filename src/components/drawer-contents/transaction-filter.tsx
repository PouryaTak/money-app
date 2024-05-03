import React, { useContext, useMemo } from "react"
import TypeTabs from "../transaction-form/type-tabs"
import { DictionaryContext } from "@/providers/dictionary-provider"
import { Button } from "../ui/button"
import { queryClient } from "@/providers/provider-container"
import useTransactions from "@/hooks/useTransactions"
import useFilterStore from "@/store/useFilterStore"
import useDrawerStore from "@/store/useDrawerStore"
import { categories as CATEGORIES } from "@/helpers/static-data"
import Icon from "../ui/icons"
import { Transaction } from "@/types/transaction"
import { TrashIcon } from "lucide-react"

const TransactionFilter = () => {
    const { dictionary } = useContext(DictionaryContext)
    const {
        isLoading,
        data: { data: transactions },
    } = useTransactions()
    const { setIsDrawerOpen, setQuery } = useDrawerStore((state) => state.actions)
    const { actions, type, tags, categories } = useFilterStore((state) => state)
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

    const currentCategories = useMemo(() => {
        const categories = new Set<string>()
        ;(transactions ?? []).forEach((transaction: Transaction) => {
            categories.add(transaction.category)
        })
        return Array.from(categories)
    }, [transactions])
    
    const categoryArray =
        type === "all" ? currentCategories : currentCategories.filter((i) => Boolean(CATEGORIES[type][i]))

    const currentTags = useMemo(() => {
        const tags = new Set<string>()
        ;(transactions ?? []).forEach((transaction: Transaction) => {
            transaction.tags.forEach((tag) => tags.add(tag))
        })
        return Array.from(tags)
    }, [transactions])

    return (
        <form onSubmit={applyFilter} className="flex flex-col gap-3">
            <span>{dictionary.general.type}</span>
            <TypeTabs
                isLoading={isLoading}
                currentValue={type}
                onOptionChange={actions.setType}
                values={typeTabValues}
            />

            <div className="flex justify-between items-center">
                <span>{dictionary.details.category}</span>
                <span className="text-sm text-gray-500 flex items-center">
                    {Boolean(categories.length) && (
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={() => actions.toggleCategories(null)}
                            className="text-red-500"
                        >
                            <TrashIcon size={16} />
                        </Button>
                    )}
                    {categories.length} {dictionary.general.selected}
                </span>
            </div>
            <div className="flex flex-wrap gap-2 p-4 h-max max-h-80 overflow-y-auto border border-gray-400 rounded-lg ">
                {categoryArray.map((category: any, index) => (
                    <div
                        key={category + index}
                        className={`flex self-start gap-2 items-center relative p-2 border rounded-lg cursor-pointer select-none ${
                            categories.includes(category) && "border-primary bg-white"
                        }`}
                        onClick={() => actions.toggleCategories(category)}
                    >
                        <Icon name={CATEGORIES["expense"][category]?.icon || CATEGORIES["income"][category]?.icon} />
                        {category}
                    </div>
                ))}
            </div>

            {Boolean(currentTags.length) && (
                <>
                    <div className="flex justify-between items-center">
                        <span>{dictionary.details.tag}</span>
                        <span className="text-sm text-gray-500 flex items-center">
                    {Boolean(tags.length) && (
                        <Button
                            variant={"ghost"}
                            size={"icon"}
                            onClick={() => actions.toggleTags(null)}
                            className="text-red-500"
                        >
                            <TrashIcon size={16} />
                        </Button>
                    )}
                    {tags.length} {dictionary.general.selected}
                </span>
                    </div>
                    <div className="flex flex-wrap gap-2 p-4 h-max max-h-80 overflow-y-auto border border-gray-400 rounded-lg ">
                        {currentTags.map((tag: any, index) => (
                            <div
                                key={tag + index}
                                className={`flex self-start gap-2 items-center relative p-2 border rounded-lg cursor-pointer select-none ${
                                    tags.includes(tag) && "border-primary bg-white"
                                }`}
                                onClick={() => actions.toggleTags(tag)}
                            >
                                {tag}
                            </div>
                        ))}
                    </div>
                </>
            )}
            <Button>{dictionary.general["apply-filter"]}</Button>
        </form>
    )
}

export default TransactionFilter
