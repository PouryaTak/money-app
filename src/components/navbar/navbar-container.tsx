"use client"
import { useContext } from "react"
import { DrawerContext } from "@/providers/drawer-provider"
import { TransactionContext } from "@/providers/transaction-provider"
import { initialForm } from "@/helpers/static-data"
import { DictionaryContext } from "@/providers/dictionary-provider"
import Navbar from "./navbar-view"
import useRouterHandler from "@/hooks/useRouterHandler"

export default function NavbarContainer() {
    const { dictionary } = useContext(DictionaryContext)
    const { setCurrentTransaction } = useContext(TransactionContext)
    const { setIsDrawerOpen } = useContext(DrawerContext)
    const {handleDrawerQuery, pathname} = useRouterHandler()

    const addNewTransaction = () => {
        setCurrentTransaction(initialForm)
        handleDrawerQuery("new-transaction")
        setIsDrawerOpen(true)
    }
    const openSettings = () => {
        handleDrawerQuery("settings")
        setIsDrawerOpen(true)
    }
    return (
        <Navbar
            dictionary={dictionary}
            addNewTransaction={addNewTransaction}
            pathname={pathname}
            openSettings={openSettings}
        />
    )
}
