"use client";
import React, { useContext, useState } from "react";
import { TransactionContext } from "@/context/transaction-provider";
import { initialForm } from "@/helpers/static-data";
import { addCommas, removeNonNumeric } from "@/lib/utils";
import TransactionForm from "./transaction-form";
import { DrawerContext } from "@/context/drawer-provider";
import {
  addTransaction,
  updateTransaction,
} from "@/functions/handle-transactions";

export default function TransactionFormContainer() {
  const {
    saveStoreTransaction,
    currentTransaction,
    setCurrentTransaction,
    updateStoreTransaction,
  } = useContext(TransactionContext);
  const { setIsDrawerOpen } = useContext(DrawerContext);
  const [isLoading, setIsLoading] = useState(false);

  const saveTransactionHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      currentTransaction.amount = removeNonNumeric(currentTransaction.amount);

      if (currentTransaction.id) {
        await updateTransaction(currentTransaction.id, currentTransaction);
        updateStoreTransaction(currentTransaction);
      } else {
        currentTransaction.id = crypto.randomUUID();
        await addTransaction(currentTransaction);
        saveStoreTransaction(currentTransaction);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
      setCurrentTransaction(initialForm);
      setIsDrawerOpen(false);
    }
  };

  const onOptionChange = (value: any, key: keyof typeof currentTransaction) => {
    setCurrentTransaction((current: any) => {
      const currentClone = { ...current };
      currentClone[key] =
        key == "amount" ? addCommas(removeNonNumeric(value)) : value;
      return currentClone;
    });
  };
  return (
    <TransactionForm
      currentTransaction={currentTransaction}
      onOptionChange={onOptionChange}
      saveTransactionHandler={saveTransactionHandler}
      isLoading={isLoading}
    />
  );
}
