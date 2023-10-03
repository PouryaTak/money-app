import React, { memo } from "react";
import { categories } from "@/helpers/static-data";
import CategoryItem from "@/components/transaction-form/category-item";
import { Transaction } from "@/types/transaction";
function CategoryList({
  isLoading,
  currentTransaction,
  onOptionChange,
}: {
  isLoading: boolean;
  currentTransaction: Transaction;
  onOptionChange: Function;
}) {
  return (
    <div
      className={`flex flex-wrap items-start content-start gap-3 flex-1 p-2 bg-gray-100 rounded-xl ${
        isLoading ? "pointer-events-none opacity-50" : ""
      }`}
      key={currentTransaction.type}
    >
      {categories[currentTransaction.type].map((i: any) => (
        <CategoryItem
          currentTransaction={currentTransaction}
          data={i}
          onOptionChange={onOptionChange}
          key={i.key}
        />
      ))}
    </div>
  );
}

export default memo(CategoryList);
