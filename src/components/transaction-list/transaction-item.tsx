import React, { useContext, useMemo } from "react";
import moment from "moment-jalaali";
import { numberSeparator } from "@/functions/handle-numbers";
import { categories } from "@/helpers/static-data";
import { DrawerContext } from "@/context/drawer-provider";
import { TransactionContext } from "@/context/transaction-provider";
import { Transaction } from "@/types/transaction";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icons";
import TransactionListItemPopover from "./item-popover";

export default function TransactionListItem({ transaction }: { transaction: Transaction }) {
  const { deleteTransaction, setCurrentTransaction } = useContext(TransactionContext);
  const {setIsDrawerOpen} = useContext(DrawerContext)

  const getCategory = (i: Transaction) => {
    return categories[i.type].find((item: any) => item.key === i.category);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction);
    setIsDrawerOpen(true);
  };

  const handleDeleteTransaction = (id: string) => {
    deleteTransaction(id);
  };

  const date = useMemo(() => moment(transaction.date), [transaction.date]);
  return (
    <Card className="grid grid-cols-[40px_2fr_1fr] gap-y-2 gap-x-4 grid-rows-2 bg-white p-3 md:p-4">
      <div
        className={`col-span-1 row-start-1 row-end-3 flex items-center justify-center rounded-lg  ${
          transaction.type == "expense" ? "text-red-500 bg-red-100" : "text-green-500 bg-green-100"
        }`}
      >
        <Icon name={getCategory(transaction).icon} size={16} />
      </div>
      <div className="col-start-2 col-end-3 row-start-1 row-end-2 font-bold">{transaction.title || "0"}</div>
      <div className="col-start-2 col-end-3 row-start-2 row-end-3 truncate flex gap-2 text-slate-500">
        <span className="text-slate-300 text-sm leading-6">IRR </span>
        {numberSeparator(Number(transaction.amount)) || "0"}
      </div>
      <div className="col-start-3 col-end-4 row-start-1 row-end-2 truncate text-end text-xs">
        {date.format("jMMMM jDD") || "-"}
      </div>
      <div className="flex justify-end col-start-3 col-end-4 row-start-2 row-end-3 truncate text-end">
        <TransactionListItemPopover
          handleEditTransaction={() => handleEditTransaction(transaction)}
          handleDeleteTransaction={() => handleDeleteTransaction(transaction.id)}
        />
      </div>
    </Card>
  );
}
