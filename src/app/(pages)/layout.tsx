import React from "react"
import TransactionProvider from "@/context/transaction-provider"
import DateProvider from "@/context/date-provider"
import DrawerProvider from "@/context/drawer-provider"
import PagesContainer from "@/components/pages-container"
import getTranslations from "@/functions/get-translations"
import DictionaryProvider from "@/context/dictionary-provider"
import SettingsProvider from "@/context/settings-provider"
import { cookies } from "next/dist/client/components/headers"

export default async function Layout({ children }: { children: React.ReactElement }) {
    const dictionary = await getTranslations()
    const cookieStore = cookies()
    const settings = cookieStore.get('settings')
    
    return (
        <SettingsProvider>
            <DateProvider>
                <TransactionProvider>
                    <DrawerProvider>
                        <DictionaryProvider dictionary={dictionary}>
                            <PagesContainer settings={JSON.parse(settings!.value)}>{children}</PagesContainer>
                        </DictionaryProvider>
                    </DrawerProvider>
                </TransactionProvider>
            </DateProvider>
        </SettingsProvider>
    )
}
