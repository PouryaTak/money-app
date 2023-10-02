"use client";
import React, { useContext } from "react";
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

  const saveTransactionHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    currentTransaction.amount = removeNonNumeric(currentTransaction.amount);
    if (currentTransaction.id) {
      await updateTransaction(currentTransaction._id, currentTransaction)
        .then((res: any) => updateStoreTransaction(currentTransaction))
        .finally(setIsDrawerOpen(false));
    } else {
      currentTransaction.id = crypto.randomUUID();
      await addTransaction(currentTransaction).then((res: any) =>
        saveStoreTransaction(currentTransaction),
      );
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
