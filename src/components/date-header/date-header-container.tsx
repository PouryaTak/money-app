"use client"
import moment from "moment-jalaali"
import useDateController from "@/hooks/useDateController"
import DateHeaderView from "./date-header-view"
import { Settings } from "@/types/settings"
import { useContext } from "react"
import { DictionaryContext } from "@/providers/dictionary-provider"

export default function DateHeaderContainer({ settings }: { settings: Settings }) {
    const { dictionary } = useContext(DictionaryContext)
    if (settings.lang === "fa-IR") {
        moment.loadPersian({ dialect: "persian-modern" })
    }
    const { currentListDate, goPreviousDate, goNextDate, onResetDate } = useDateController(settings)

    return (
        <DateHeaderView
            goNext={goNextDate}
            goPrev={goPreviousDate}
            date={currentListDate}
            dictionary={dictionary}
            resetDate={onResetDate}
        />
    )
}
