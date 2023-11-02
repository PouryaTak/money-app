import React, { useCallback, useContext, useMemo } from "react";
import moment from "moment-jalaali";
import { numberSeparator } from "@/functions/handle-numbers";
import { categories } from "@/helpers/static-data";
import { Transaction } from "@/types/transaction";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icons";
import TransactionListItemPopover from "@/components/transaction-list/item-popover";
import { SettingsContext } from "@/context/settings-provider";

export default function TransactionListItem({
  transaction,
  handleEditTransaction,
  handleDeleteTransaction,
  dictionary,
}: {
  transaction: Transaction;
  handleEditTransaction: (transaction: Transaction) => void;
  handleDeleteTransaction: (transaction: Transaction) => void;
  dictionary: any;
}) {
  const {settings} = useContext(SettingsContext)
  const getCategory = useCallback((transaction: Transaction) => {
    if (!transaction.category) return "Home";
    return categories[transaction.type].find(
      (item: any) => item.key == transaction.category
    );
  }, []);
  const isJalaliCalender = useMemo(()=> (settings.calender == 'jalali' ? 'j' : '') ,[settings.calender])
  const date = useMemo(() => moment(transaction.date), [transaction.date]);

  return (
    <Card className="grid grid-cols-[40px_2fr_1fr] gap-y-2 gap-x-4 grid-rows-2 bg-white p-3 md:p-4">
      <div
        className={`col-span-1 row-start-1 row-end-3 flex items-center justify-center rounded-lg  ${
          transaction.type == "expense"
            ? "text-red-500 bg-red-100"
            : "text-green-500 bg-green-100"
        }`}
      >
        <span aria-hidden>
          <Icon name={getCategory(transaction).icon} size={16} />
        </span>
        <span className="sr-only">{dictionary.general[transaction.type]}</span>
      </div>
      <span className="col-start-2 col-end-3 row-start-1 row-end-2 font-bold truncate">
        {transaction.title || "0"}
      </span>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 truncate flex gap-2 text-slate-500">
        <span className="text-slate-300 text-sm leading-6">{settings.currency} </span>
        {numberSeparator(Number(transaction.amount)) || "0"}
      </div>
      <div className="col-start-3 col-end-4 row-start-1 row-end-2 truncate text-end text-xs">
        {date.format(`${isJalaliCalender}MMMM ${isJalaliCalender}DD`) || "-"}
      </div>
      <div className="flex justify-end col-start-3 col-end-4 row-start-2 row-end-3 truncate text-end">
        <TransactionListItemPopover
          dictionary={dictionary}
          handleEditTransaction={() => handleEditTransaction(transaction)}
          handleDeleteTransaction={() => handleDeleteTransaction(transaction)}
        />
      </div>
    </Card>
  );
}
