"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import React, { useContext } from "react"
import Icon from "@/components/ui/icons"
import { Plus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DrawerContext } from "@/context/drawer-provider"
import { TransactionContext } from "@/context/transaction-provider"
import { initialForm } from "@/helpers/static-data"
import { DictionaryContext } from "@/context/dictionary-provider"

const links = [
    {
        title: "home",
        href: "/",
        icon: "Home",
    },
    {
        title: "chart",
        href: "/chart",
        icon: "PieChart",
    },
]

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()

    const { dictionary } = useContext(DictionaryContext)
    const { setCurrentTransaction } = useContext(TransactionContext)
    const { setIsDrawerOpen } = useContext(DrawerContext)

    const handleDrawerQuery = (name: string) => {
        console.log('---------', pathname);
        
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
        <ul className="w-full p-3 grid grid-flow-col-dense gap-6 relative bg-white border-t max-w-5xl mx-auto">
            <li>
                <Button
                    title={dictionary.pages["add-new-transaction"]}
                    onClick={addNewTransaction}
                    size={"icon"}
                    className="shadow-lg flex mx-auto shadow-slate-300"
                >
                    <Plus width={32} height={32} aria-hidden />
                    <span className="sr-only">{dictionary.pages["add-new-transaction"]}</span>
                </Button>
            </li>
            {links.map((i) => {
                const isActive = pathname === i.href
                return (
                    <li key={i.title} className={isActive ? "text-orange-500" : ""}>
                        <Link href={i.href} className="flex flex-col items-center justify-center gap-1">
                            <Icon name={i.icon} aria-hidden />
                            <span className="text-xs md:text-sm">
                                {" "}
                                <span className="sr-only">{dictionary.pages["go-to"]} </span>{" "}
                                {dictionary.pages[i.title].title}
                            </span>
                        </Link>
                    </li>
                )
            })}
            <li>
                <Button
                    onClick={openSettings}
                    className="flex flex-col items-center mx-auto gap-1 h-12 hover:bg-transparent p-0"
                    variant={"ghost"}
                >
                    <Settings width={28} height={28} aria-hidden className="shrink-0" />
                    <span className="text-xs md:text-sm">{dictionary.pages["settings"]}</span>
                </Button>
            </li>
        </ul>
    )
}
