import React, { ComponentType } from "react"
import dynamic from "next/dynamic"
import useRouterHandler from "@/hooks/useRouterHandler"

type Contents = {
    transactionForm: ComponentType<{}>
    settings: ComponentType<{}>
    transactionDetails: ComponentType<{}>
    addTagForm: ComponentType<{}>
    transactionFilter: ComponentType<{}>
}

type Query = keyof Contents | ""

const contents: Contents = {
    transactionForm: dynamic(
        () => import(/* webpackChunkName: "TransactionForm"*/ "./transaction-form/transaction-form-container")
    ),
    settings: dynamic(() => import(/* webpackChunkName: "Settings"*/ "./settings/settings-container")),
    transactionDetails: dynamic(() => import("./transaction-list/transaction-details")),
    addTagForm: dynamic(() => import("./drawer-contents/new-tag-form")),
    transactionFilter: dynamic(() => import("./drawer-contents/transaction-filter")),
}

export type DrawerContentsProps = keyof typeof contents

export default function DrawerContents() {
    const { searchParam } = useRouterHandler()
    const query = searchParam.get("drawer") as Query
    const DynamicComponent = query !== "" ? contents[query] : null
    return DynamicComponent && <DynamicComponent />
}
