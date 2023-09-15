"use client";
import Balance from "@/components/balance-view";
import TransactionList from "@/components/transaction-list/transaction-list";
import DateHeader from "@/components/date-header";

export default function Home() {
 
  return (
    <div className="relative max-w-5xl h-full grid grid-rows-[80px_100px_1fr] p-5 pt-0 mx-auto overflow-hidden bg-white">
      <DateHeader />
      <Balance />
      <TransactionList />
    </div>
  );
}
