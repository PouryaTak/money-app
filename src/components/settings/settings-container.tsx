"use client"
import React, { useContext, useMemo } from "react"
import { SettingsContext } from "@/context/settings-provider"
import Settings from "./settings-view"
import { settingsTabItems } from "@/helpers/static-data"

export default function SettingsContainer() {
    const { settings, handleChange, saveSettings, isLoading } = useContext(SettingsContext)

    const CurrencyTabValue: string = useMemo(
        () =>
            settingsTabItems.CurrencyTabs.map((i) => i.value).includes(settings.currency)
                ? settings.currency
                : "custom",
        [settings.currency]
    )

    return (
        <Settings
            settings={settings}
            isLoading={isLoading}
            tabItems={settingsTabItems}
            handleChange={handleChange}
            CurrencyTabValue={CurrencyTabValue}
            saveSettings={saveSettings}
        />
    )
}
