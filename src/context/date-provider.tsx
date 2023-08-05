import React, { createContext, useState } from "react";
interface SelectedDate {
  startDate: any;
  endDate: any;
}
export const DateContext = createContext<{selectedDate:SelectedDate,setSelectedDate:any }>({});

export default function DateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedDate, setSelectedDate] = useState<SelectedDate>({
    startDate: null,
    endDate: null,
  });
  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
}
