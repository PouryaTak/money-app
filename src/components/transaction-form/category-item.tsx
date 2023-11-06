import { Check } from "lucide-react";
import React from "react";
import Icon from "@/components/ui/icons";
import { Transaction } from "@/types/transaction";

export default function CategoryItem({
  data,
  onOptionChange,
  transactionType,
  isSelected
}: {
  data: any;
  onOptionChange: Function;
  transactionType: Transaction['type']
  isSelected:boolean
}) {
  
  const labelClassName = `flex self-start gap-2 items-center relative p-2 border rounded-lg ${
    !isSelected
      ? "border-slate-300"
      : transactionType === "expense"
      ? "bg-white !text-red-500 !border-current"
      : "bg-white text-green-500 !border-current"
  }`;

  const renderCheckIcon = isSelected && (
    <span className="w-4 h-4 rounded-full grid place-content-center absolute -right-2 -top-2 bg-current">
      <Check width={12} height={12} className="text-white" />
    </span>
  );

  return (
    <label htmlFor={data.name} key={data.name} className={labelClassName}>
      {renderCheckIcon}
      <input
        type="radio"
        name="category"
        value={data.name}
        id={data.name}
        checked={isSelected}
        onChange={(e) => onOptionChange(e.target.value, "category")}
        className="absolute inset-0 opacity-0 !cursor-pointer"
      />
      <Icon name={data.icon} />
      <span className="mt-1 text-inherit">{data.name}</span>
    </label>
  );
}
