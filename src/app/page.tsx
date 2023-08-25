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
import { ListPlus, XSquare } from "lucide-react";

export default function Home() {
  const drawer = useRef<any>();
  return (
    <DateProvider>
      <TransactionProvider>
        <main className="relative max-w-5xl min-h-screen p-5 mx-auto overflow-hidden bg-white">
          <Drawer toggler={drawer}>
            <>
              <button onClick={() => drawer.current(false)}><XSquare size={24} className="text-slate-500" /></button>
              <TransactionForm />
            </>
          </Drawer>
          <Balance />
          <DateHeader />
          <TransactionList />
          <Button onClick={() => drawer.current(true)} className="flex items-center gap-2">
            <span className="font-bold">Add</span>
            <ListPlus />
            
          </Button>
        </main>
      </TransactionProvider>
    </DateProvider>
  );
}
