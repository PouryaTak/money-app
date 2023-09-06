"use client";
import { useRef } from "react";
import Balance from "@/components/balance-view";
import Drawer from "@/components/drawer";
import TransactionForm from "@/components/transaction-form";
import TransactionList from "@/components/transaction-list";
import TransactionProvider from "@/context/transaction-provider";
import DateHeader from "@/components/date-header";
import DateProvider from "@/context/date-provider";
import { Button } from "@/components/ui/button";
import { ListPlus, Plus, XSquare } from "lucide-react";

export default function Home() {
  const drawer = useRef<any>();
  return (
    <DateProvider>
      <TransactionProvider>
        <main className="relative max-w-5xl h-screen grid grid-rows-[80px_100px_1fr] p-5 pt-0 mx-auto overflow-hidden bg-white">
          <Drawer toggler={drawer}>
            <>
              <button onClick={() => drawer.current(false)}><XSquare size={24} className="text-slate-500" /></button>
              <TransactionForm />
            </>
          </Drawer>
          <DateHeader />
          <Balance />
          <TransactionList />
          <Button onClick={() => drawer.current(true)} size={'icon'} className="flex items-center gap-2 ml-auto shadow-lg shadow-slate-300">
            <Plus width={32} height={32} />     
          </Button>
        </main>
      </TransactionProvider>
    </DateProvider>
  );
}
