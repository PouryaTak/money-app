"use client"
import moment from "moment-jalaali"
import useDateController from "@/hooks/useDateController"
import DateHeaderView from "./date-header-view"
import { Settings } from "@/types/settings"

export default function DateHeaderContainer({settings}:{settings:Settings}) {
    if (settings.lang === "fa-IR") {
        moment.loadPersian({ dialect: "persian-modern" })
    }
    const {currentListDate,goPreviousDate, goNextDate} = useDateController(settings)
  
    return <DateHeaderView goNext={goNextDate} goPrev={goPreviousDate} date={currentListDate} />
}
