"use client";
import React, { useContext } from "react";
import { TransactionContext } from "@/context/transaction-provider";
import { initialForm } from "@/helpers/static-data";
import { addCommas, removeNonNumeric } from "@/functions/handle-transactions";
import TransactionForm from "./transaction-form";
import { DrawerContext } from "@/context/drawer-provider";

export default function TransactionFormContainer() {
  const {
    saveTransaction,
    currentTransaction,
    setCurrentTransaction,
    updateTransaction,
  } = useContext(TransactionContext);
  const { setIsDrawerOpen } = useContext(DrawerContext);

  const saveTransactionHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    currentTransaction.amount = removeNonNumeric(currentTransaction.amount);
    if (currentTransaction.id) {
      updateTransaction(currentTransaction);
      setIsDrawerOpen(false);
    } else {
      currentTransaction.id = crypto.randomUUID();
      saveTransaction(currentTransaction);
    }
    setCurrentTransaction(initialForm);
  };

  const onOptionChange = (value: any, key: keyof typeof currentTransaction) => {
    setCurrentTransaction((current: any) => {
      const currentClone = JSON.parse(JSON.stringify(current));
      currentClone[key] =
        key == "amount" ? addCommas(removeNonNumeric(value)) : value;
      return currentClone;
    });
  };
  return (
    <>
      <TransactionForm
        currentTransaction={currentTransaction}
        onOptionChange={onOptionChange}
        saveTransactionHandler={saveTransactionHandler}
      />
    </>
  );
}
