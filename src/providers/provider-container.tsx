"use client"
import React from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import DateProvider from "@/providers/date-provider"
import DictionaryProvider from "@/providers/dictionary-provider"
import SettingsProvider from "@/providers/settings-provider"
import { NextAuthProvider } from "./auth-provider"
import { Toaster } from "react-hot-toast"

export const queryClient = new QueryClient()
export default function ProviderContainer({ children, dictionary }: { children: React.ReactElement; dictionary: any }) {
    return (
        <NextAuthProvider>
            <QueryClientProvider client={queryClient}>
                <SettingsProvider>
                    <DateProvider>
                        <Toaster position="top-right" />
                        <DictionaryProvider dictionary={dictionary}>{children}</DictionaryProvider>
                    </DateProvider>
                </SettingsProvider>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </NextAuthProvider>
    )
}
