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

  const saveTransactionHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    currentTransaction.amount = removeNonNumeric(currentTransaction.amount);
    if (currentTransaction.id) {
      updateTransaction(currentTransaction._id, currentTransaction)
        .then((res: any) => updateStoreTransaction(currentTransaction))
        .finally(() => {
          setIsDrawerOpen(false);
          setIsLoading(false);
        });
    } else {
      currentTransaction.id = crypto.randomUUID();
      addTransaction(currentTransaction)
        .then((res: any) => saveStoreTransaction(currentTransaction))
        .finally(() => setIsLoading(false));
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
        isLoading={isLoading}
      />
    </>
  );
}
