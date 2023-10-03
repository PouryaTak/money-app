import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { Transaction } from "@/types/transaction";
import CalenderInput from "@/components/transaction-form/calender-input";
import CategoryList from "./category-list";
import TypeTabs from "./type-tabs";

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
  return (
    <form
      className="flex flex-col gap-3 h-[calc(100%-24px)] bg-white"
      onSubmit={saveTransactionHandler}
    >
      <TypeTabs
        isLoading={isLoading}
        currentTransaction={currentTransaction}
        onOptionChange={onOptionChange}
      />
      <CategoryList
        isLoading={isLoading}
        currentTransaction={currentTransaction}
        onOptionChange={onOptionChange}
      />
      <CalenderInput
        isLoading={isLoading}
        currentTransaction={currentTransaction}
        onOptionChange={onOptionChange}
      />
      <Input
        placeholder="title"
        disabled={isLoading}
        value={currentTransaction.title}
        onChange={(e) => onOptionChange(e.target.value, "title")}
      />
      <Input
        type="text"
        placeholder="amount"
        value={currentTransaction.amount}
        required
        onChange={(e) => onOptionChange(e.target.value, "amount")}
        disabled={isLoading}
      />
      <Textarea
        rows={5}
        placeholder="description"
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
        add {currentTransaction.type}
      </Button>
    </form>
  );
}
