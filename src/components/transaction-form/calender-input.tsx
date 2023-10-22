import React from "react";
import { CalendarIcon } from "lucide-react";
import { Transaction } from "@/types/transaction";
import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import persian_en from "react-date-object/locales/persian_en";
import gregorian_en from "react-date-object/locales/gregorian_en";
import gregorian_fa from "react-date-object/locales/gregorian_fa";

export default function CalenderInput({
  isLoading,
  currentTransaction,
  onOptionChange,
  dictionary,
}: {
  isLoading: boolean;
  currentTransaction: Transaction;
  onOptionChange: Function;
  dictionary: any;
}) {
  return (
    <DatePicker
      value={currentTransaction.date}
      placeholder={dictionary.general.form['select-date']}
      disabled={isLoading}
      maxDate={new Date()}
      calendar={persian}
      locale={persian_fa}
      calendarPosition={'top-center'}
      required={true}
      onChange={(e: DateObject) =>  onOptionChange(e.toDate().toISOString(), "date")}
    />
  );
}
