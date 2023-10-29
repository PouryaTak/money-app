"use client"
import React, { useContext, useEffect, useState } from "react"
import moment from "moment-jalaali"
import { DateContext } from "@/context/date-provider"
import DateHeaderView from "./date-header-view"
import { SettingsContext } from "@/context/settings-provider"

export default function DateHeaderContainer() {
    moment.loadPersian({ dialect: "persian-modern" })
    const {settings} = useContext(SettingsContext)
    const [date, setDate] = useState(moment(Date.now()))
    const { setSelectedDate } = useContext(DateContext)

    const goPrev = () => {
        setDate(moment(date.format()).subtract(1, "jMonth"))
    }

    const goNext = () => {
        setDate(moment(date.format()).add(1, "jMonth"))
    }

    useEffect(() => {
        console.log(date.endOf("jMonth").format())
        setSelectedDate((current: any) => {
            current.startDate = date.startOf("jMonth").format()
            current.endDate = date.endOf("jMonth").format()
            return JSON.parse(JSON.stringify(current))
        })
    }, [date, setSelectedDate])
    return <DateHeaderView goNext={goNext} goPrev={goPrev}  date={date.format("jMMMM")}/>
}
