"use client";
import { TransactionContext } from "@/context/transaction-provider";
import { categories, initialForm } from "@/helpers/static-data";
import React, { useContext } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import Icon from "./ui/icons";
import { Calendar } from "./ui/calender";
import { CalendarIcon, Check, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { addCommas, removeNonNumeric } from "@/functions/handle-transactions";

export default function TransactionForm() {
  const { saveTransaction, currentTransaction, setCurrentTransaction } =
    useContext(TransactionContext);

  const saveTransactionHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    currentTransaction.amount = removeNonNumeric(currentTransaction.amount);
    if (currentTransaction.id) {
    } else {
      currentTransaction.id = crypto.randomUUID();
      saveTransaction(currentTransaction);
    }
    setCurrentTransaction(initialForm);
  };

  const onOptionChange = (value: any, key: keyof typeof currentTransaction) => {
    setCurrentTransaction((current: any) => {
      current[key] =
        key == "amount" ? addCommas(removeNonNumeric(value)) : value;
      return JSON.parse(JSON.stringify(current));
    });
  };
  return (
    <form
      className="flex flex-col gap-3 h-[calc(100%-24px)]"
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
          <label
            htmlFor={i.key}
            key={i.key}
            className={`flex self-start gap-2 items-center relative p-2 border border-slate-300 rounded-lg ${
              i.key == currentTransaction.category &&
              "bg-white border-slate-500"
            }`}
          >
            {i.key == currentTransaction.category && (
              <span className="w-4 h-4 rounded-full bg-slate-800 grid place-content-center absolute top-1/2 -translate-y-1/2 -left-2">
                <Check width={12} height={12} className="text-white" />
              </span>
            )}
            <input
              type="radio"
              name="category"
              value={i.key}
              id={i.key}
              checked={i.key === currentTransaction.category}
              onChange={(e) => onOptionChange(e.target.value, "category")}
              className="absolute inset-0 opacity-0 !cursor-pointer"
            />
            <Icon name={i.icon} />
            <span className="mt-1">{i.value}</span>
          </label>
        ))}
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !currentTransaction.date && "text-muted-foreground"
            )}
          >
            {currentTransaction.date ? (
              currentTransaction.date.slice(0, 10)
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
