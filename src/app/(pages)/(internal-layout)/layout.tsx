import React from "react"
import getTranslations from "@/functions/get-translations"
import { cookies } from "next/dist/client/components/headers"
import ProviderContainer from "@/providers/provider-container"
import PagesContainer from "@/components/pages-container"

export default async function Layout({ children }: { children: React.ReactElement }) {
    const cookieStore = cookies()
    const cookieSettings = cookieStore.get("settings")
    const settings = JSON.parse(cookieSettings!.value)
    return <PagesContainer settings={settings}>{children}</PagesContainer>
}
