"use client";
import { DrawerContext } from "@/context/drawer-provider";
import React, { useContext } from "react";
import { ArrowLeft, X } from "lucide-react";

export default function Drawer({ children }: { children: React.ReactNode }) {
  const { isDrawerOpen, setIsDrawerOpen } = useContext(DrawerContext);
  return (
    <div
      className={`${
        isDrawerOpen ? "bg-black/10" : "bg-black/0 pointer-events-none"
      } transition-all absolute inset-0 duration-500 z-30`}
      onClick={() => setIsDrawerOpen(false)}
    >
      <div
        className={`absolute bg-slate-50 p-5 fixed-h duration-500 w-full md:w-1/2 transition-all top-0 shadow-xl ${
          isDrawerOpen ? "right-0" : "-right-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={() => setIsDrawerOpen(false)}>
          <ArrowLeft
            size={24}
            className="text-slate-800 md:hidden"
            aria-hidden
          />
          <X size={24} className="text-slate-800 hidden md:block" aria-hidden />
          <span className="sr-only">close drawer</span>
        </button>
        {isDrawerOpen && children}
      </div>
    </div>
  );
}
