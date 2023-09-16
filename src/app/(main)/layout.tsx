"use client";
import Navbar from "@/components/navbar";
import React from "react";
import Drawer from "@/components/drawer";
import TransactionForm from "@/components/transaction-form";
import TransactionProvider from "@/context/transaction-provider";
import DateProvider from "@/context/date-provider";
import DrawerProvider from "@/context/drawer-provider";
import DateHeader from "@/components/date-header";

export default function Layout({ children }: { children: React.ReactElement }) {

  return (
    <DateProvider>
      <TransactionProvider>
        <DrawerProvider>
          <main className="h-screen grid grid-rows-[1fr_68px] overflow-hidden relative">
            <Drawer>
              <TransactionForm />
            </Drawer>
            <div className="relative w-full max-w-5xl h-full grid grid-rows-[80px_100px_1fr] p-5 pt-0 mx-auto overflow-y-auto bg-white">
              <DateHeader />
              {children}
            </div>
            <Navbar />
          </main>
        </DrawerProvider>
      </TransactionProvider>
    </DateProvider>
  );
}
