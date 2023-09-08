"use client";
import { TransactionContext } from "@/context/transaction-provider";
import { categories, types } from "@/helpers/static-data";
import { Transaction } from "@/types/transaction";
import React, { useContext, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import Icon from "./ui/icons";

const initialForm = {
  type: "expense",
  category: "item01",
  title: "",
  date: "",
  amount: "",
  desc: "",
  id: "",
}

export default function TransactionForm() {
  const { saveTransaction } = useContext(TransactionContext);
  const [transaction, setTransaction] = useState<Transaction>(initialForm);

  const saveTransactionHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    transaction.id = crypto.randomUUID();
    transaction.amount = removeNonNumeric(transaction.amount)
    saveTransaction(transaction);
    setTransaction(initialForm)
  };

    const addCommas = (num:any) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    const removeNonNumeric = (num:any) => num.toString().replace(/[^0-9]/g, "");
  
  const onOptionChange = (e: any, key: keyof typeof transaction) => {
    setTransaction((current) => {
      current[key] = key == "amount" ? addCommas(removeNonNumeric(e.target.value)) : e.target.value;
      return JSON.parse(JSON.stringify(current));
    });
    console.log(transaction);
  };
  return (
    <form className="flex flex-col gap-3 h-[calc(100%-24px)]" onSubmit={saveTransactionHandler}>
      <Tabs
        defaultValue="expense"
        className="w-full"
        onValueChange={(e) => onOptionChange({ target: { value: e } }, "type")}
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
      <div className="flex flex-wrap items-start content-start gap-3 flex-1 p-2 bg-gray-100 rounded-xl" key={transaction.type}>
        {categories[transaction.type].map((i:any) => (
          <label htmlFor={i.key} key={i.key} className={`flex self-start gap-2 items-center relative p-2 border rounded-lg ${i.key == transaction.category && 'bg-white' }`}
          style={{borderColor:i.color}}>
            <input
              type="radio"
              name="category"
              value={i.key}
              id={i.key}
              checked={i.key === transaction.category}
              onChange={(e) => onOptionChange(e, "category")}
              className="absolute inset-0 opacity-0 !cursor-pointer"
            />
            <Icon name={i.icon}/>
            {i.value}
          </label>
        ))}
      </div>
      <input
        type="datetime-local"
        required
        onChange={(e) => onOptionChange(e, "date")}
      />
      <Input placeholder="title" onChange={(e) => onOptionChange(e, "title")} />
      <Input
        type="text"
        placeholder="amount"
        value={transaction.amount}
        required
        onChange={(e) => onOptionChange(e, "amount")}
      />
      <Textarea 
        rows={5}
        placeholder="description"
        onChange={(e) => onOptionChange(e, "desc")}
      ></Textarea>
      <Button
        className={`text-white p-2 capitalize ${
          transaction.type == "income" ? "bg-green-600" : "bg-orange-600"
        }`}
      >
        add {transaction.type}
      </Button>
    </form>
  );
}
