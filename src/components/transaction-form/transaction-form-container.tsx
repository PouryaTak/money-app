"use client";
import React, { useContext } from "react";
import { TransactionContext } from "@/context/transaction-provider";
import { initialForm } from "@/helpers/static-data";
import { addCommas, removeNonNumeric } from "@/functions/handle-transactions";
import TransactionForm from "./transaction-form";

export default function TransactionFormContainer() {
  const { saveTransaction, currentTransaction, setCurrentTransaction } = useContext(TransactionContext);

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
      current[key] = key == "amount" ? addCommas(removeNonNumeric(value)) : value;
      return JSON.parse(JSON.stringify(current));
    });
  };
  return (
    <TransactionForm
      currentTransaction={currentTransaction}
      onOptionChange={onOptionChange}
      saveTransactionHandler={saveTransactionHandler}
    />
  );
}
