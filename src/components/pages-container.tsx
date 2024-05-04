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
import SwipeWrapper from "./swipe-wrapper"

export default function PagesContainer({ children, settings }: { children: React.ReactElement; settings: Settings }) {
    useTransactions()
    useEffect(() => {
        fixHeight()
        addEventListener("resize", () => {
            fixHeight()
        })
        return () => removeEventListener("resize", () => fixHeight())
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
                    <SwipeWrapper settings={settings}>{children}</SwipeWrapper>
                </ContentView>
                <NavbarContainer />
            </div>
        </>
    )
}
