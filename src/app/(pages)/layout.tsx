import React from "react"
import getTranslations from "@/functions/get-translations"
import { cookies } from "next/dist/client/components/headers"
import ProviderContainer from "@/providers/provider-container"

export default async function Layout({ children }: { children: React.ReactElement }) {
    const dictionary = await getTranslations()
    const cookieStore = cookies()
    const cookieSettings = cookieStore.get("settings")
    const settings = JSON.parse(cookieSettings!.value)
    return (
        <ProviderContainer dictionary={dictionary} settings={settings}>
            {children}
        </ProviderContainer>
    )
}
