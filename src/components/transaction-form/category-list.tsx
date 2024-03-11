import React from "react"
import { categories } from "@/helpers/static-data"
import CategoryItem from "@/components/transaction-form/category-item"
import { Transaction } from "@/types/transaction"
function CategoryList({
    isLoading,
    onOptionChange,
    transactionType,
    transactionCategory,
}: {
    isLoading: boolean
    onOptionChange: Function
    transactionType: Transaction["type"]
    transactionCategory: Transaction["category"]
}) {
    return (
        <div
            className={`flex flex-wrap items-start content-start gap-3 flex-1 p-2 bg-gray-100 rounded-xl ${
                isLoading ? "pointer-events-none opacity-50" : ""
            }`}
            key={transactionType}
        >
            {Object.keys(categories[transactionType]).map((categoryKey: any) => {
                const categoryItem = categories[transactionType][categoryKey]
                return (
                    <CategoryItem
                        transactionType={transactionType}
                        title={categoryKey}
                        data={categoryItem}
                        onOptionChange={onOptionChange}
                        isSelected={categoryKey === transactionCategory}
                        key={categoryKey}
                    />
                )
            })}
        </div>
    )
}

export default CategoryList
