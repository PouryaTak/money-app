"use client";
import Navbar from "@/components/navbar";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen grid grid-rows-[1fr_76px]">
      <div className="overflow-y-auto">{children}</div>
      <Navbar />
    </div>
  );
}
