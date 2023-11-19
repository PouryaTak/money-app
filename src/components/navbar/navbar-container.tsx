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
    const { setIsDrawerOpen, setQuery } = useContext(DrawerContext)
    const { pathname} = useRouterHandler()

    const addNewTransaction = () => {
        setCurrentTransaction(initialForm)
        setQuery("transactionForm")
        setIsDrawerOpen(true)
    }
    const openSettings = () => {
        setQuery("settings")
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
