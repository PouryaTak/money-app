"use client";
import { TransactionContext } from "@/context/transaction-provider";
import { categories, types } from "@/helpers/static-data";
import { Transaction } from "@/types/transaction";
import React, { useContext, useState } from "react";

export default function TransactionForm() {
  const { saveTransaction } = useContext(TransactionContext)
  const [transaction, setTransaction] = useState<Transaction>({
    type: "expense",
    category: "item01",
    title: "",
    date: "",
    amount: "",
    desc: "",
    id: "",
  });

  const saveTransactionHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    transaction.id = crypto.randomUUID();
    saveTransaction(transaction);
  };
  const onOptionChange = (e: any, key: keyof typeof transaction) => {
    setTransaction((current) => {
      current[key] = e.target.value;
      return JSON.parse(JSON.stringify(current));
    });
    console.log(transaction);
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={saveTransactionHandler}>
      <div className="flex gap-4">
        {types.map((i) => (
          <label htmlFor={i.key} key={i.key}>
            <input
              type="radio"
              name="type"
              value={i.key}
              id={i.key}
              checked={i.key == transaction.type}
              onChange={(e) => onOptionChange(e, "type")}
            />
            {i.value}
          </label>
        ))}
      </div>
      <div className="flex gap-3" key={transaction.type}>
        {categories[transaction.type].map((i) => (
          <label htmlFor={i.key} key={i.key}>
            <input
              type="radio"
              name="category"
              value={i.key}
              id={i.key}
              checked={i.key === transaction.category}
              onChange={(e) => onOptionChange(e, "category")}
            />
            {i.value}
          </label>
        ))}
      </div>
      <input
        type="datetime-local"
        required
        onChange={(e) => onOptionChange(e, "date")}
      />
      <input
        type="text"
        placeholder="title"
        onChange={(e) => onOptionChange(e, "title")}
      />
      <input
        type="number"
        placeholder="amount"
        required
        onChange={(e) => onOptionChange(e, "amount")}
      />
      <textarea
        rows={5}
        placeholder="description"
        onChange={(e) => onOptionChange(e, "desc")}
      ></textarea>
      <button className={`text-white p-2 capitalize ${transaction.type == 'income' ? 'bg-green-600' : 'bg-orange-600'}`}>
        add {transaction.type}
      </button>
    </form>
  );
}
