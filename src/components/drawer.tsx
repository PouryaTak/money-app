"use client";
import React, { useEffect, useState } from "react";

export default function Drawer({
  children,
  toggler,
}: {
  children: React.ReactNode;
  toggler: any;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    toggler.current = setIsOpen;
  }, []);
  return (
    <div
      className={`${
        isOpen ? "bg-black/10" : "bg-black/0 pointer-events-none"
      } transition-all absolute inset-0 duration-500 z-30`}
      onClick={() => setIsOpen(false)}
    >
      <div
        className={`absolute bg-slate-50 p-5 h-screen duration-500 w-full md:w-1/2 transition-all top-0 shadow-xl ${
          isOpen ? "right-0" : "-right-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
