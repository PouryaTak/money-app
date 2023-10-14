import { Check } from "lucide-react";
import React, { useMemo } from "react";
import Icon from "../ui/icons";
import { Transaction } from "@/types/transaction";

export default function CategoryItem({
  currentTransaction,
  data,
  onOptionChange,
}: {
  currentTransaction: Transaction;
  data: any;
  onOptionChange: Function;
}) {
  const isCategorySelected = useMemo(
    () => data.key == currentTransaction.category,
    [currentTransaction.category, data.key],
  );
  return (
    <label
      htmlFor={data.key}
      key={data.key}
      className={`flex self-start gap-2 items-center relative p-2 border border-slate-300 rounded-lg ${
        !isCategorySelected
          ? ""
          : currentTransaction.type === "expense"
          ? "bg-white !text-red-500 !border-current"
          : "bg-white text-green-500 !border-current"
      }`}
    >
      {isCategorySelected && (
        <span className="w-4 h-4 rounded-full grid place-content-center absolute -right-2 -top-2 bg-current">
          <Check width={12} height={12} className="text-white" />
        </span>
      )}
      <input
        type="radio"
        name="category"
        value={data.key}
        id={data.key}
        checked={isCategorySelected}
        onChange={(e) => onOptionChange(e.target.value, "category")}
        className="absolute inset-0 opacity-0 !cursor-pointer"
      />
      <Icon name={data.icon} />
      <span className="mt-1 text-inherit">{data.value}</span>
    </label>
  );
}
