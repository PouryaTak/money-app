import React from "react"
import { categories } from "@/helpers/static-data"
import CategoryItem from "@/components/transaction-form/category-item"
import { Transaction } from "@/types/transaction"
import { Button } from "../ui/button"
function CategoryList({
    isLoading,
    onOptionChange,
    transactionType,
    transactionCategory,
    onAddNewTagButtonClick,
}: {
    isLoading: boolean
    onOptionChange: Function
    transactionType: Transaction["type"]
    transactionCategory: Transaction["category"]
    onAddNewTagButtonClick: () => void
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
            {/* uncomment when the create tag form is ready */}
            {/* <Button variant={"outline"} className="text-xl h-11" onClick={onAddNewTagButtonClick}>
                +
            </Button> */}
        </div>
    )
}

export default CategoryList
