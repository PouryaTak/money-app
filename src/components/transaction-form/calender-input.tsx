import React from "react"
import { CalendarIcon } from "lucide-react"
import DatePicker, { DateObject } from "react-multi-date-picker"
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import persian_en from "react-date-object/locales/persian_en"
import gregorian_en from "react-date-object/locales/gregorian_en"
import gregorian_fa from "react-date-object/locales/gregorian_fa"
import { CalenderInputProps } from "@/types/general"

const calenderLocal: { [key: string]: any } = {
    "fa-IR": {
        jalali: persian_fa,
        gregorian: gregorian_fa,
    },
    "en-US": {
        jalali: persian_en,
        gregorian: gregorian_en,
    },
}

export default function CalenderInput(props: CalenderInputProps) {
    const { isLoading, transactionDate, onOptionChange, dictionary, settings } = props
    return (
        <div className="relative">
            <DatePicker
                value={transactionDate}
                placeholder={dictionary.general.form["select-date"]}
                disabled={isLoading}
                maxDate={new Date()}
                calendar={persian}
                locale={calenderLocal[settings.lang][settings.calender]}
                calendarPosition={"top-center"}
                required={true}
                onChange={(e: DateObject) => onOptionChange(e.toDate().toISOString(), "date")}
            />
            <CalendarIcon className="absolute right-3 top-2 text-gray-400" />
        </div>
    )
}
