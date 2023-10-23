"use client"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useContext } from "react";
import { Transaction } from "@/types/transaction";
import CalenderInput from "@/components/transaction-form/calender-input";
import CategoryList from "./category-list";
import TypeTabs from "./type-tabs";
import { DictionaryContext } from "@/context/dictionary-provider";

export default function TransactionForm({
  currentTransaction,
  onOptionChange,
  saveTransactionHandler,
  isLoading,
}: {
  currentTransaction: Transaction;
  onOptionChange: Function;
  saveTransactionHandler: React.FormEventHandler<HTMLFormElement>;
  isLoading: boolean;
}) {
  const {dictionary} = useContext(DictionaryContext)
  return (
    <form
      className="flex flex-col gap-3 h-[calc(100%-44px)] "
      onSubmit={saveTransactionHandler}
    >
      <TypeTabs
        isLoading={isLoading}
        transactionType={currentTransaction.type}
        onOptionChange={onOptionChange}
        dictionary={dictionary}
      />
      <CategoryList
        isLoading={isLoading}
        transactionType={currentTransaction.type}
        transactionCategory={currentTransaction.category}
        onOptionChange={onOptionChange}
      />
      <CalenderInput
        isLoading={isLoading}
        transactionDate={currentTransaction.date}
        onOptionChange={onOptionChange}
        dictionary={dictionary}
      />
      <Input
        placeholder={dictionary.general.form.title}
        disabled={isLoading}
        value={currentTransaction.title}
        onChange={(e) => onOptionChange(e.target.value, "title")}
      />
      <Input
        type="text"
        placeholder={dictionary.general.form.amount}
        value={currentTransaction.amount}
        required
        onChange={(e) => onOptionChange(e.target.value, "amount")}
        disabled={isLoading}
      />
      <Textarea
        rows={5}
        placeholder={dictionary.general.form.description}
        value={currentTransaction.desc}
        onChange={(e) => onOptionChange(e.target.value, "desc")}
        disabled={isLoading}
      ></Textarea>
      <Button
        disabled={isLoading}
        className={`text-white p-2 capitalize ${
          currentTransaction.type == "income"
            ? "bg-green-600 hover:bg-green-500"
            : "bg-orange-600"
        }`}
      >
        {
          `${dictionary.general.add} ${currentTransaction.type == "income" ? dictionary.general.income : dictionary.general.expense}` 
        }
      </Button>
    </form>
  );
}
