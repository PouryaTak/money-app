import React from "react"
import Icon from "@/components/ui/icons"
import { Plus, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { navLinks } from "@/helpers/static-data"
import { NavbarProps } from "@/types/navbar"

export default function Navbar(props: NavbarProps) {
    const { dictionary, addNewTransaction, pathname, openSettings } = props
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
            {navLinks.map((i) => {
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
                    <Settings width={24} height={24} aria-hidden className="shrink-0" />
                    <span className="text-xs md:text-sm">{dictionary.pages["settings"]}</span>
                </Button>
            </li>
        </ul>
    )
}
