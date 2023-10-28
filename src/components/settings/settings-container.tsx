"use client"
import React, { useContext, useMemo } from "react"
import { SettingsContext } from "@/context/settings-provider"
import Settings from "./settings-view"

const tabItems = {
    LangTabs: [
        { title: "English", value: "en-US" },
        { title: "فارسی", value: "fa-IR" },
    ],
    CalTabs: [
        { title: "Gregorian", value: "gregorian" },
        { title: "Jalali", value: "jalali" },
    ],
    CurrencyTabs: [
        { title: "Dollar ($)", value: "$" },
        { title: "Rials (IRR)", value: "IRR" },
        { title: "Custom", value: "custom" },
    ],
}

export default function SettingsContainer() {
    const { settings, handleChange, saveSettings, isLoading } = useContext(SettingsContext)

    const CurrencyTabValue: string = useMemo(
        () => (tabItems.CurrencyTabs.map((i) => i.value).includes(settings.currency) ? settings.currency : "custom"),
        [settings.currency]
    )

    return (
        <Settings
            settings={settings}
            isLoading={isLoading}
            tabItems={tabItems}
            handleChange={handleChange}
            CurrencyTabValue={CurrencyTabValue}
            saveSettings={saveSettings}
        />
    )
}
