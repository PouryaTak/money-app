import React from "react"
import { cookies } from "next/headers"
import PagesContainer from "@/components/pages-container"
import { initialSettingsState } from "@/helpers/static-data"

export default async function Layout({ children }: { children: React.ReactElement }) {
    const cookieStore = cookies()
    const cookieSettings = cookieStore.get("settings")
    const settings =
        cookieSettings && cookieSettings?.value !== "undefined"
            ? JSON.parse(cookieSettings?.value)
            : initialSettingsState

    return <PagesContainer settings={settings}>{children}</PagesContainer>
}
