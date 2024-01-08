import React from "react"
import getTranslations from "@/functions/get-translations"
import ProviderContainer from "@/providers/provider-container"

export default async function Layout({ children }: { children: React.ReactElement }) {
    const dictionary = await getTranslations()
    return (
        <ProviderContainer dictionary={dictionary}>
            <main className="fixed-h overflow-hidden relative">{children}</main>
        </ProviderContainer>
    )
}
