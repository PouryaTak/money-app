"use client"
import React, { useContext, useEffect, useMemo, useState } from "react"
import moment from "moment-jalaali"
import { DateContext } from "@/context/date-provider"
import DateHeaderView from "./date-header-view"
import { Settings } from "@/types/settings"

export default function DateHeaderContainer({settings}:{settings:Settings}) {
    if (settings.lang === "fa-IR") {
        moment.loadPersian({ dialect: "persian-modern" })
    }
    const [date, setDate] = useState(moment(Date.now()))
    const { setSelectedDate } = useContext(DateContext)

    const isJalaliCalender = useMemo(() => (settings.calender == "jalali" ? "j" : ""), [settings.calender])

    const currentListDate = useMemo(() => date.format(`${isJalaliCalender}MMMM`), [date, isJalaliCalender])
    //@ts-ignore
    const MonthFormat = useMemo<"jMonth">(() => `${isJalaliCalender}Month`, [isJalaliCalender])

    const goPrev = () => {
        setDate(moment(date.format()).subtract(1, MonthFormat))
    }

    const goNext = () => {
        setDate(moment(date.format()).add(1, MonthFormat))
    }

    useEffect(() => {
        setSelectedDate((current: any) => {
            current.startDate = date.startOf(MonthFormat).format()
            current.endDate = date.endOf(MonthFormat).format()
            return JSON.parse(JSON.stringify(current))
        })
    }, [MonthFormat, date, setSelectedDate])
    return settings.lang && <DateHeaderView goNext={goNext} goPrev={goPrev} date={currentListDate} />
}
