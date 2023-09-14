"use client";
import { useContext, useRef } from "react";
import Balance from "@/components/balance-view";
import Drawer from "@/components/drawer";
import TransactionForm from "@/components/transaction-form";
import TransactionList from "@/components/transaction-list";
import TransactionProvider from "@/context/transaction-provider";
import DateHeader from "@/components/date-header";
import DateProvider from "@/context/date-provider";
import { XSquare } from "lucide-react";

export default function Home() {
  const drawer = useRef<any>();
  return (
    <DateProvider>
      <TransactionProvider>
        <main className="relative max-w-5xl h-full grid grid-rows-[80px_100px_1fr] p-5 pt-0 mx-auto overflow-hidden bg-white">
          <Drawer toggler={drawer}>
            <>
              <button onClick={() => drawer.current(false)}><XSquare size={24} className="text-slate-500" /></button>
              <TransactionForm />
            </>
          </Drawer>
          <DateHeader />
          <Balance />
          <TransactionList openDrawer={() => drawer.current(true)} />
        </main>
      </TransactionProvider>
    </DateProvider>
  );
}
