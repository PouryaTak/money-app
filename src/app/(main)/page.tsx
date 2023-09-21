"use client";
import Balance from "@/components/balance-view";
import TransactionList from "@/components/transaction-list/transaction-list";

export default function Home() {
  return (
    <>
      <Balance />
      <TransactionList />
    </>
  );
}
