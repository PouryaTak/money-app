"use client";
import Navbar from "@/components/navbar";
import React, { useContext, useRef } from "react";
import Drawer from "@/components/drawer";
import TransactionForm from "@/components/transaction-form";
import TransactionProvider from "@/context/transaction-provider";
import DateProvider from "@/context/date-provider";
import DrawerProvider, { DrawerContext } from "@/context/drawer-provider";

export default function Layout({ children }: { children: React.ReactElement }) {
  const drawer = useRef<any>();
  const { isOpen, setIsOpen } = useContext(DrawerContext);

  return (
    <DateProvider>
      <TransactionProvider>
        <DrawerProvider>
          <main className="h-screen grid grid-rows-[1fr_68px] overflow-hidden relative">
            <Drawer>
              <TransactionForm />
            </Drawer>
            <div className="overflow-y-auto">{children}</div>
            <Navbar />
          </main>
        </DrawerProvider>
      </TransactionProvider>
    </DateProvider>
  );
}
