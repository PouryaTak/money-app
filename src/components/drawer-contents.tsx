import React, { ComponentType, useContext } from "react"
import dynamic from "next/dynamic"
import { DrawerContext } from "@/providers/drawer-provider"

const contents: {
    transactionForm: ComponentType<{}>
    settings: ComponentType<{}>
} = {
    transactionForm: dynamic(
        () => import(/* webpackChunkName: "TransactionForm"*/ "./transaction-form/transaction-form-container")
    ),
    settings: dynamic(() => import(/* webpackChunkName: "Settings"*/ "./settings/settings-container")),
}

export type DrawerContentsProps = keyof typeof contents

export default function DrawerContents() {
    const { query } = useContext(DrawerContext)
    const DynamicComponent = query !== "" ? contents[query] : null
    return DynamicComponent && <DynamicComponent />
}
