"use client";
import { useRef } from "react";
import Balance from "@/components/balance-view";
import Drawer from "@/components/drawer";
import TransactionForm from "@/components/transaction-form";
import TransactionList from "@/components/transaction-list";
import TransactionProvider from "@/context/transaction-provider";
import DateHeader from "@/components/date-header";
import DateProvider from "@/context/date-provider";

export default function Home() {
  const drawer = useRef<any>();
  return (
    <DateProvider>
      <TransactionProvider>
        <main className="max-w-5xl mx-auto relative overflow-hidden bg-slate-200 min-h-screen p-5">
          <Drawer toggler={drawer}>
            <>
            <button onClick={()=> drawer.current(false)}>close</button>
            <TransactionForm />
            </>
          </Drawer>
          <Balance />
          <DateHeader />
          <TransactionList />
          <button onClick={() => drawer.current(true)}>add</button>
        </main>
      </TransactionProvider>
    </DateProvider>
  );
}
