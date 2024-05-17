"use client"
import React, { Suspense } from "react"
import { ArrowLeft, X } from "lucide-react"
import { Button } from "./ui/button"
import useRouterHandler from "@/hooks/useRouterHandler"

export default function Drawer({ children }: { children: React.ReactNode }) {
    const {router, searchParam} = useRouterHandler()
    const hasDrawerQuery = searchParam.get("drawer")
    const handleClose = () => {
        router.back()
    }

    return (
        <div
            className={`${
                hasDrawerQuery ? "bg-black/10" : "bg-black/0 pointer-events-none"
            } transition-all absolute inset-0 duration-500 z-30`}
            onClick={handleClose}
        >
            <div
                className={`absolute bg-slate-50 p-5 pt-20 fixed-h duration-500 w-full md:w-1/2 transition-all top-0 shadow-xl overflow-y-auto ${
                    hasDrawerQuery ? "right-0" : "-right-full"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <Button onClick={handleClose} variant={"secondary"} size={"icon"} className="fixed z-50 top-5">
                    <ArrowLeft size={24} className="text-slate-800 md:hidden" aria-hidden />
                    <X size={24} className="text-slate-800 hidden md:block" aria-hidden />
                    <span className="sr-only">close drawer</span>
                </Button>
                <Suspense fallback={<span>Loading...</span>}>{Boolean(hasDrawerQuery) && children}</Suspense>
            </div>
        </div>
    )
}
