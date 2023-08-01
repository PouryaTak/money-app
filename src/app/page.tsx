"use client";
import {useRef} from 'react'
import Balance from "@/components/balance-view";
import SideBar from "@/components/side-bar";
import TransactionForm from "@/components/transaction-form";
import TransactionList from "@/components/transaction-list";
import TransactionProvider from "@/context/transaction-provider";

export default function Home() {
  const sidebar = useRef<any>()
  return (
    <TransactionProvider>
      <main className="max-w-5xl mx-auto relative overflow-hidden bg-slate-200 min-h-screen p-5">
        <SideBar toggler={sidebar}>
          <TransactionForm />
        </SideBar>
        <Balance />
        <TransactionList />
        <button onClick={()=>sidebar.current(true)}>add</button>
      </main>
    </TransactionProvider>
  );
}
