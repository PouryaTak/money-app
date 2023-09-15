"use client";
import { DrawerContext } from "@/context/drawer-provider";
import React, { useContext } from "react";
import { XSquare } from "lucide-react";

export default function Drawer({ children }: { children: React.ReactNode }) {
  const { isOpen, setIsOpen } = useContext(DrawerContext);
  return (
    <div
      className={`${isOpen ? "bg-black/10" : "bg-black/0 pointer-events-none"} transition-all absolute inset-0 duration-500 z-30`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`absolute bg-slate-50 p-5 h-screen duration-500 w-full md:w-1/2 transition-all top-0 shadow-xl ${
          isOpen ? "right-0" : "-right-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => setIsOpen(false)}>
          <XSquare size={24} className="text-slate-500" />
        </button>
        {children}
      </div>
    </div>
  );
}
