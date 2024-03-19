import React, { ComponentType } from "react"
import dynamic from "next/dynamic"
import useDrawerStore from "@/store/useDrawerStore"

type Contents = {
    transactionForm: ComponentType<{}>
    settings: ComponentType<{}>
}

const contents: Contents = {
    transactionForm: dynamic(() => import(/* webpackChunkName: "TransactionForm"*/ "./transaction-form/transaction-form-container")),
    settings: dynamic(() => import(/* webpackChunkName: "Settings"*/ "./settings/settings-container")),
}

export type DrawerContentsProps = keyof typeof contents

export default function DrawerContents() {
    const {query} = useDrawerStore((state) => state)
    const DynamicComponent = query !== "" ? contents[query] : null
    return DynamicComponent && <DynamicComponent />
}
