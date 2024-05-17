"use client"
import { useContext } from "react"
import { initialForm } from "@/helpers/static-data"
import { DictionaryContext } from "@/providers/dictionary-provider"
import Navbar from "./navbar-view"
import useRouterHandler from "@/hooks/useRouterHandler"
import useTransactionStore from "@/store/useTransactionStore"

export default function NavbarContainer() {
    const { dictionary } = useContext(DictionaryContext)
    const { updateTransaction } = useTransactionStore((state) => state.actions)
    const { pathname, handleSearchParams } = useRouterHandler()

    const addNewTransaction = () => {
        updateTransaction(initialForm)
        handleSearchParams("drawer", "transactionForm")
    }
    const openSettings = () => {
        handleSearchParams("drawer", "settings")
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
