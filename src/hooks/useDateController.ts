import { useContext, useEffect, useMemo, useState } from "react"
import moment from "moment-jalaali"
import { Settings } from "@/types/settings";
import { DateContext } from "@/context/date-provider"

export default function useDateController(settings:Settings) {
    const [date, setDate] = useState(moment(Date.now()))
    const { setSelectedDate } = useContext(DateContext)

    const isJalaliCalender = useMemo(() => (settings.calender == "jalali" ? "j" : ""), [settings.calender])

    const currentListDate = useMemo(() => date.format(`${isJalaliCalender}MMMM`), [date, isJalaliCalender])
    //@ts-ignore
    const MonthFormat = useMemo<"jMonth">(() => `${isJalaliCalender}Month`, [isJalaliCalender])

    const goPreviousDate = () => {
        setDate(moment(date.format()).subtract(1, MonthFormat))
    }

    const goNextDate = () => {
        setDate(moment(date.format()).add(1, MonthFormat))
    }

    useEffect(() => {
        setSelectedDate((current: any) => {
            current.startDate = date.startOf(MonthFormat).format()
            current.endDate = date.endOf(MonthFormat).format()
            return JSON.parse(JSON.stringify(current))
        })
    }, [MonthFormat, date, setSelectedDate])
    return {currentListDate,goPreviousDate, goNextDate}
}
