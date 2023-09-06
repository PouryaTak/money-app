"use client";
import { DateContext } from "@/context/date-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { Transaction } from "@/types/transaction";
import React, { useContext, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { numberSeparator } from "@/functions/number-separator";
import moment from "moment-jalaali";
import { categories } from "@/helpers/static-data";
import Icon from "./ui/icons";

export default function TransactionList() {
  const { transactions, deleteTransaction } = useContext(TransactionContext);
  const { selectedDate } = useContext(DateContext);

  const filteredList = useMemo(() => {
    return transactions.filter(
      (i: Transaction) =>
        i.date <= selectedDate.endDate && i.date >= selectedDate.startDate
    );
  }, [selectedDate, transactions]);

  const getCategory = (i:Transaction)=> {
    return categories[i.type].find((item:any) => item.key === i.category)
  }

  return (
    <div className="flex flex-col gap-3 my-3 h-full overflow-y-auto border rounded-lg p-3">
      {Boolean(filteredList.length) &&
        filteredList.sort((a:any,b:any)=> a.date > b.date ? -1 : 1).map((i: any) => {
          const date = moment(i.date);
          return (
            <Card
              key={i.id}
              className="grid grid-cols-[40px_2fr_1fr] gap-y-2 gap-x-4 grid-rows-2 bg-white p-5"
            >
              <div
                className={`col-span-1 row-start-1 row-end-3 flex items-center justify-center rounded-lg  ${
                  i.type == "expense"
                    ? "text-red-500 bg-red-100"
                    : "text-green-500 bg-green-100"
                }`}
              >
            
              <Icon name={getCategory(i).icon} size={16}/>
              </div>
              <div className="col-start-2 col-end-3 row-start-1 row-end-2 font-bold">
                {i.title || "0"}
              </div>
              <div className="col-start-2 col-end-3 row-start-2 row-end-3 truncate flex gap-2 text-slate-500">
              <span className="text-slate-300 text-sm leading-6">IRR </span> 
              {numberSeparator(i.amount) || "0"}
              </div>
              <div className="col-start-3 col-end-4 row-start-1 row-end-2 truncate text-end">
                {date.format('jMMMM jDD') || "-"}
              </div>
              <div className="flex justify-end col-start-3 col-end-4 row-start-2 row-end-3 truncate text-end">
                <button
                  onClick={() => deleteTransaction(i.id)}
                  className="text-red-500 "
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </Card>
          );
        })}
    </div>
  );
}
