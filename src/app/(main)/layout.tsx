"use client";
import Navbar from "@/components/navbar";
import React, { useEffect } from "react";
import Drawer from "@/components/drawer";
import TransactionProvider from "@/context/transaction-provider";
import DateProvider from "@/context/date-provider";
import DrawerProvider from "@/context/drawer-provider";
import DateHeader from "@/components/date-header";
import dynamic from "next/dynamic";
import fixHeight from "@/functions/fix-height";

const TransactionForm = dynamic(
  () => import("../../components/transaction-form/transaction-form-container"),
);
export default function Layout({ children }: { children: React.ReactElement }) {
  useEffect(() => {
    fixHeight();
  }, []);
  return (
    <DateProvider>
      <TransactionProvider>
        <DrawerProvider>
          <main className="fixed-h grid grid-rows-[1fr_68px] overflow-hidden relative">
            <Drawer>
              <TransactionForm />
            </Drawer>
            <div className="relative w-full max-w-5xl h-full grid grid-rows-[80px_auto_1fr] p-5 pt-0 mx-auto overflow-y-hidden bg-white">
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
