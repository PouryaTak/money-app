import { useContext, useEffect, useMemo, useState } from "react"
import moment from "moment-jalaali"
import { Settings } from "@/types/settings"
import { DateContext } from "@/providers/date-provider"
import useRouterHandler from "./useRouterHandler"

export default function useDateController(settings: Settings) {
    const { handleSearchParams, searchParam } = useRouterHandler()
    const [date, setDate] = useState(moment(Date.now()))
    const { setSelectedDate } = useContext(DateContext)

    const isJalaliCalender = useMemo(() => (settings.calender == "jalali" ? "j" : ""), [settings.calender])

    const currentListDate = useMemo(() => {
        const year =
            date.format(`${isJalaliCalender}YYYY`) !== moment(Date.now()).format(`${isJalaliCalender}YYYY`)
                ? `${isJalaliCalender}YYYY `
                : ""
        return date.format(`${year} ${isJalaliCalender}MMMM`)
    }, [date, isJalaliCalender])
    //@ts-ignore
    const MonthFormat = useMemo<"jMonth">(() => `${isJalaliCalender}Month`, [isJalaliCalender])

    const goPreviousDate = () => {
        handleSearchParams("date", moment(date.format()).subtract(1, MonthFormat).format("x"))
    }

    const goNextDate = () => {
        handleSearchParams("date", moment(date.format()).add(1, MonthFormat).format("x"))
    }
    const onResetDate = () => {
        setDate(moment(Date.now()))
        handleSearchParams("date", moment(moment(Date.now()).format()).format("x"))
    }

    useEffect(() => {
        setSelectedDate((current: any) => {
            current.startDate = date.startOf(MonthFormat).format()
            current.endDate = date.endOf(MonthFormat).format()
            return JSON.parse(JSON.stringify(current))
        })
    }, [MonthFormat, date, setSelectedDate])

    useEffect(() => {
        const iso = searchParam.get("date")
        if (iso) {
            setDate(moment(+iso))
        }
    }, [searchParam])

    return { currentListDate, goPreviousDate, goNextDate, onResetDate }
}
