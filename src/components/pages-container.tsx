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
import ContentView from "./content-view"

export default function PagesContainer({ children, settings }: { children: React.ReactElement; settings: Settings }) {
    useTransactions()
    useEffect(() => {
        fixHeight()
    }, [])
    return (
        <>
            <Drawer>
                <DrawerContents />
            </Drawer>
            <div className="h-full grid grid-rows-[1fr_68px]">
                <ContentView className=" grid grid-rows-[64px_auto_1fr]">
                    <DateHeader settings={settings} />
                    <Balance />
                    {children}
                </ContentView>
                <NavbarContainer />
            </div>
        </>
    )
}
