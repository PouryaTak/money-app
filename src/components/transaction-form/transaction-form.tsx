import { categories } from "@/helpers/static-data";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calender";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import CategoryItem from "./category-item";
import React from "react";
import { Transaction } from "@/types/transaction";

export default function TransactionForm({
  currentTransaction,
  onOptionChange,
  saveTransactionHandler,
}: {
  currentTransaction: Transaction;
  onOptionChange: Function;
  saveTransactionHandler: React.FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form
      className="flex flex-col gap-3 h-[calc(100%-24px)] bg-white"
      onSubmit={saveTransactionHandler}
    >
      <Tabs
        defaultValue="expense"
        value={currentTransaction.type}
        className="w-full"
        onValueChange={(e) => onOptionChange(e, "type")}
      >
        <TabsList className="w-full">
          <TabsTrigger value="expense" className="w-full">
            Expense
          </TabsTrigger>
          <TabsTrigger value="income" className="w-full">
            Income
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div
        className="flex flex-wrap items-start content-start gap-3 flex-1 p-2 bg-gray-100 rounded-xl"
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !currentTransaction.date && "text-muted-foreground",
            )}
          >
            {currentTransaction?.date ? (
              JSON.stringify(currentTransaction.date).slice(1, 11)
            ) : (
              <span>date</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="z-50">
          <Calendar
            mode="single"
            selected={currentTransaction.date as any}
            onSelect={(e) => onOptionChange(e, "date")}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        placeholder="title"
        value={currentTransaction.title}
        onChange={(e) => onOptionChange(e.target.value, "title")}
      />
      <Input
        type="text"
        placeholder="amount"
        value={currentTransaction.amount}
        required
        onChange={(e) => onOptionChange(e.target.value, "amount")}
      />
      <Textarea
        rows={5}
        placeholder="description"
        value={currentTransaction.desc}
        onChange={(e) => onOptionChange(e.target.value, "desc")}
      ></Textarea>
      <Button
        className={`text-white p-2 capitalize ${
          currentTransaction.type == "income" ? "bg-green-600" : "bg-orange-600"
        }`}
      >
        add {currentTransaction.type}
      </Button>
    </form>
  );
}
