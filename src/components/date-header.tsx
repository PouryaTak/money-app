"use client";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment-jalaali";
import { DateContext } from "@/context/date-provider";

export default function DateHeader() {
    moment.loadPersian({dialect: 'persian-modern'})
  const [date, setDate] = useState(moment(Date.now()));
const {setSelectedDate} = useContext(DateContext)

  const goPrev = () => {
    setDate(moment(date.format()).subtract(1, "jMonth"));
  };

  const goNext = () => {
    setDate(moment(date.format()).add(1, "jMonth"));
  };

  useEffect(()=>{
    console.log(date.endOf("jMonth").format());
    
    setSelectedDate((current:any) => {
        current.startDate = date.startOf("jMonth").format()
        current.endDate = date.endOf("jMonth").format()
        return JSON.parse(JSON.stringify(current))
    })
  },[date])
  return (
    <div className="w-full flex justify-between">
      <button onClick={goPrev}>Prev</button>
      <h1>{date.format("jMMMM")}</h1>
      <button onClick={goNext}>Next</button>
    </div>
  );
}
