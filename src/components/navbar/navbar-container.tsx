"use client"
import { usePathname, useRouter } from "next/navigation"
import { useContext } from "react"
import { DrawerContext } from "@/context/drawer-provider"
import { TransactionContext } from "@/context/transaction-provider"
import { initialForm } from "@/helpers/static-data"
import { DictionaryContext } from "@/context/dictionary-provider"
import Navbar from "./navbar-view"

export default function NavbarContainer() {
    const pathname = usePathname()
    const router = useRouter()
    const { dictionary } = useContext(DictionaryContext)
    const { setCurrentTransaction } = useContext(TransactionContext)
    const { setIsDrawerOpen } = useContext(DrawerContext)

    const handleDrawerQuery = (name: string) => {
        router.replace(pathname + "?drawer=" + name)
    }

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
