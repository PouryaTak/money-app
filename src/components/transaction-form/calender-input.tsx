import React from "react";
import { CalendarIcon } from "lucide-react";
import { Transaction } from "@/types/transaction";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_fa from "react-date-object/locales/gregorian_fa";

const calenderLocal = {
  'fa-IR':{
    jalali:persian_fa,
    gregorian: gregorian_fa
  },
  'en-US':{
    jalali:persian_en,
    gregorian: gregorian_en
  },
}

export default function CalenderInput({
  isLoading,
  transactionDate,
  onOptionChange,
  dictionary,
}: {
  isLoading: boolean;
  transactionDate: Transaction["date"];
  onOptionChange: Function;
  dictionary: any;
}) {
  return (
    <div className="relative">
      <DatePicker
        value={transactionDate}
        placeholder={dictionary.general.form["select-date"]}
        disabled={isLoading}
        maxDate={new Date()}
        calendar={persian}
        locale={calenderLocal['fa-IR']['jalali']}
        calendarPosition={"top-center"}
        required={true}
        onChange={(e: DateObject) =>
          onOptionChange(e.toDate().toISOString(), "date")
        }
      />
      <CalendarIcon className="absolute right-3 top-2 text-gray-400" />
    </div>
  );
}
