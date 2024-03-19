"use client"
import { useContext } from "react"
import { initialForm } from "@/helpers/static-data"
import { DictionaryContext } from "@/providers/dictionary-provider"
import Navbar from "./navbar-view"
import useRouterHandler from "@/hooks/useRouterHandler"
import useDrawerStore from "@/store/useDrawerStore"
import useTransactionStore from "@/store/useTransactionStore"

export default function NavbarContainer() {
    const { dictionary } = useContext(DictionaryContext)
    const {updateTransaction} = useTransactionStore((state) => state.actions)
    const { setIsDrawerOpen, setQuery } = useDrawerStore((state) => state.actions)
    const { pathname} = useRouterHandler()

    const addNewTransaction = () => {
        updateTransaction(initialForm)
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
