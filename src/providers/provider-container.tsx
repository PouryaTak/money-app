"use client"
import React from "react"
import { QueryClient, QueryClientProvider  } from "react-query"
import { ReactQueryDevtools  } from "react-query/devtools"
import TransactionProvider from "@/providers/transaction-provider"
import DateProvider from "@/providers/date-provider"
import DrawerProvider from "@/providers/drawer-provider"
import PagesContainer from "@/components/pages-container"
import DictionaryProvider from "@/providers/dictionary-provider"
import SettingsProvider from "@/providers/settings-provider"
import { Settings } from "@/types/settings"

export default function ProviderContainer({
    children,
    settings,
    dictionary,
}: {
    children: React.ReactElement
    settings: Settings
    dictionary: any
}) {
    const queryClient = new QueryClient()
    return (
        <QueryClientProvider client={queryClient}>
            <SettingsProvider>
                <DateProvider>
                    <TransactionProvider>
                        <DrawerProvider>
                            <DictionaryProvider dictionary={dictionary}>
                                <PagesContainer settings={settings}>{children}</PagesContainer>
                            </DictionaryProvider>
                        </DrawerProvider>
                    </TransactionProvider>
                </DateProvider>
            </SettingsProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}
