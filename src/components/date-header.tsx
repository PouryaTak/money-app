"use client";
import React, { useContext, useEffect, useState } from "react";
import moment from "moment-jalaali";
import { DateContext } from "@/context/date-provider";
import { Button } from "@/components/ui/button";

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
  },[date, setSelectedDate])
  return (
    <div className="w-full flex justify-between py-5">
      <Button variant="secondary" onClick={goPrev}>Prev</Button>
      <h2 className="text-xl font-bold mt-2">{date.format("jMMMM")}</h2>
      <Button variant="secondary" onClick={goNext}>Next</Button>
    </div>
  );
}
