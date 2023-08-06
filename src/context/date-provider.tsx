import moment from "moment-jalaali";
import React, { createContext, useRef, useState } from "react";
interface Date {
  startDate: any;
  endDate: any;
}

interface DateContext {
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<any>>;
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<any>>;
}
export const DateContext = createContext<DateContext>({});

export default function DateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const current = useRef(moment(Date.now()))
  const [selectedDate, setSelectedDate] = useState<Date>({
    startDate: null,
    endDate: null,
  });

  const [currentDate, setCurrentDate] = useState<Date>({
    startDate: current.current.startOf("jMonth").format(),
    endDate: current.current.endOf("jMonth").format(),
  });
  return (
    <DateContext.Provider
      value={{ selectedDate, setSelectedDate, currentDate, setCurrentDate }}
    >
      {children}
    </DateContext.Provider>
  );
}
