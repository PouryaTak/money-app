"use client"
import React, { useEffect } from "react"
import NavbarContainer from "@/components/navbar/navbar-container"
import Drawer from "@/components/drawer"
import DateHeader from "@/components/date-header"
import fixHeight from "@/functions/fix-height"
import useTransactions from "@/hooks/useTransactions"
import DrawerContents from "./drawer-contents"

export default function PagesContainer({ children }: { children: React.ReactElement }) {
    useTransactions()
    useEffect(() => {
        fixHeight()
    }, [])
    return (
        <main className="fixed-h grid grid-rows-[1fr_68px] overflow-hidden relative">
            <Drawer>
                <DrawerContents />
            </Drawer>
            <div className="relative w-full max-w-5xl h-full grid grid-rows-[80px_auto_1fr] p-5 pt-0 mx-auto overflow-y-hidden bg-white">
                <DateHeader />
                {children}
            </div>
            <NavbarContainer />
        </main>
    )
}
