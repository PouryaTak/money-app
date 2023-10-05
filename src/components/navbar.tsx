"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useContext } from "react";
import Icon from "@/components/ui/icons";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DrawerContext } from "@/context/drawer-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { initialForm } from "@/helpers/static-data";

const links = [
  {
    title: "Home",
    href: "/",
    icon: "Home",
  },
  {
    title: "Chart",
    href: "/chart",
    icon: "PieChart",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { setCurrentTransaction } = useContext(TransactionContext);
  const { setIsDrawerOpen } = useContext(DrawerContext);
  const addNewTransaction = () => {
    setCurrentTransaction(initialForm);
    setIsDrawerOpen(true);
  };
  return (
    <ul className="w-full p-3 grid grid-flow-col gap-6 relative bg-white border-t">
      <li className="absolute -top-4 left-1/2 -translate-x-1/2">
        <Button onClick={addNewTransaction} size={"icon"} className="shadow-lg shadow-slate-300">
          <Plus width={32} height={32} aria-hidden />
          <span className="sr-only">add new transaction</span>
        </Button>
      </li>
      {links.map((i) => {
        const isActive = pathname === i.href;
        return (
          <li key={i.title} className={isActive ? "text-orange-500" : ""}>
            <Link href={i.href} className="flex flex-col items-center justify-center gap-1">
              <Icon name={i.icon} aria-hidden />
              <span className="text-xs md:text-sm">
                {" "}
                <span className="sr-only">go to </span> {i.title}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
