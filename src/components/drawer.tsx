"use client"
import { DrawerContext } from "@/providers/drawer-provider"
import React, { Suspense, useContext, useEffect } from "react"
import { ArrowLeft, X } from "lucide-react"

export default function Drawer({ children }: { children: React.ReactNode }) {
    const { isDrawerOpen, setIsDrawerOpen, setQuery } = useContext(DrawerContext)
    const handleClose = () => {
        
        setIsDrawerOpen(false)
    }
    useEffect(()=>{
        !isDrawerOpen && setQuery('')
    },[isDrawerOpen, setQuery])

    return (
        <div
            className={`${
                isDrawerOpen ? "bg-black/10" : "bg-black/0 pointer-events-none"
            } transition-all absolute inset-0 duration-500 z-30`}
            onClick={handleClose}
        >
            <div
                className={`absolute bg-slate-50 p-5 fixed-h duration-500 w-full md:w-1/2 transition-all top-0 shadow-xl ${
                    isDrawerOpen ? "right-0" : "-right-full"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={handleClose}>
                    <ArrowLeft size={24} className="text-slate-800 md:hidden" aria-hidden />
                    <X size={24} className="text-slate-800 hidden md:block" aria-hidden />
                    <span className="sr-only">close drawer</span>
                </button>
                <Suspense fallback={<span>Loading...</span>}>{isDrawerOpen && children}</Suspense>
            </div>
        </div>
    )
}
