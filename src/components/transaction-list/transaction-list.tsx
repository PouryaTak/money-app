"use client";

import { Transaction } from "@/types/transaction";
import TransactionListItem from "@/components/transaction-list/transaction-item";
import TransactionLoading from "@/components/transaction-list/transaction-loading";

type TransactionListProps = {
  status: string;
  sortedTransactions: Array<any>;
  handleEdit: (item: Transaction) => void;
  handleDelete: (item: Transaction) => void;
  dictionary: any
};

export default function TransactionList({
  status,
  sortedTransactions,
  handleEdit,
  handleDelete,
  dictionary
}: TransactionListProps) {
  if (status === "error")
    return (
      <div className="flex flex-col justify-center items-center my-3 h-full overflow-y-auto">
        <span>{dictionary.general.error}</span>
      </div>
    );
  return (
    <div className="flex flex-col gap-3 my-3 h-full overflow-y-auto">
      {status === "loading" ? (
        <TransactionLoading />
      ) : Boolean(sortedTransactions?.length) ? (
        sortedTransactions.map((i: any) => (
          <TransactionListItem
            transaction={i}
            key={i.id}
            handleEditTransaction={handleEdit}
            handleDeleteTransaction={handleDelete}
            dictionary={dictionary}
          />
        ))
      ) : (
        <span>No data</span>
      )}
    </div>
  );
}
