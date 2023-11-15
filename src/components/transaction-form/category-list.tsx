import React from "react";
import { categories } from "@/helpers/static-data";
import CategoryItem from "@/components/transaction-form/category-item";
import { Transaction } from "@/types/transaction";
function CategoryList({
  isLoading,
  onOptionChange,
  transactionType,
  transactionCategory,
}: {
  isLoading: boolean;
  onOptionChange: Function;
  transactionType: Transaction["type"];
  transactionCategory: Transaction["category"];
}) {
  
  return (
    <div
      className={`flex flex-wrap items-start content-start gap-3 flex-1 p-2 bg-gray-100 rounded-xl ${
        isLoading ? "pointer-events-none opacity-50" : ""
      }`}
      key={transactionType}
    >
      {categories[transactionType].map((i: any) => (
        <CategoryItem
          transactionType={transactionType}
          data={i}
          onOptionChange={onOptionChange}
          isSelected={i.name === transactionCategory}
          key={i.name}
        />
      ))}
    </div>
  );
}

export default CategoryList;
