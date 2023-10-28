import React, { useEffect } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"

const TransactionForm = dynamic(() => import("./transaction-form/transaction-form-container"))
const Settings = dynamic(() => import("./settings/settings-container"))

export default function DrawerContents() {
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()

    useEffect(() => {
        return () => {
            router.push(pathname)
        }
    }, [pathname, router])

    if (searchParams.get("drawer") == "settings") {
        return <Settings />
    }
    if (searchParams.get("drawer") == "new-transaction") {
        return <TransactionForm />
    }
    return null
}
