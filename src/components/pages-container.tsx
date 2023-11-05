"use client"
import React, { useEffect } from "react"
import NavbarContainer from "@/components/navbar/navbar-container"
import Drawer from "@/components/drawer"
import DateHeader from "@/components/date-header/date-header-container"
import fixHeight from "@/functions/fix-height"
import useTransactions from "@/hooks/useTransactions"
import DrawerContents from "./drawer-contents"
import { Settings } from "@/types/settings"
import Balance from "./balance/balance-container"

export default function PagesContainer({ children, settings }: { children: React.ReactElement, settings:Settings }) {
    useTransactions()
    useEffect(() => {
        fixHeight()
    }, [])
    return (
        <main className="fixed-h grid grid-rows-[1fr_68px] overflow-hidden relative">
            <Drawer>
                <DrawerContents />
            </Drawer>
            <div className="relative w-full max-w-5xl h-full grid grid-rows-[64px_auto_1fr] py-5 pt-0 mx-auto overflow-y-hidden bg-white">
                <DateHeader settings={settings} />
                <Balance />
                {children}
            </div>
            <NavbarContainer />
        </main>
    )
}
