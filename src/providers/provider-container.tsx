"use client"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import TransactionProvider from "@/providers/transaction-provider"
import DateProvider from "@/providers/date-provider"
import DictionaryProvider from "@/providers/dictionary-provider"
import SettingsProvider from "@/providers/settings-provider"
import { NextAuthProvider } from "./auth-provider"

export default function ProviderContainer({ children, dictionary }: { children: React.ReactElement; dictionary: any }) {
    const queryClient = new QueryClient()
    return (
        <NextAuthProvider>
            <QueryClientProvider client={queryClient}>
                <SettingsProvider>
                    <DateProvider>
                        <TransactionProvider>
                            <DictionaryProvider dictionary={dictionary}>{children}</DictionaryProvider>
                        </TransactionProvider>
                    </DateProvider>
                </SettingsProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </NextAuthProvider>
    )
}
