import React, { memo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from "@/types/transaction";

function TypeTabs({
  isLoading,
  currentTransaction,
  onOptionChange,
  dictionary
}: {
  isLoading: boolean;
  currentTransaction: Transaction;
  onOptionChange: Function;
  dictionary:any
}) {
  return (
    <Tabs
      defaultValue="expense"
      value={currentTransaction.type}
      className="w-full"
      onValueChange={(e) => onOptionChange(e, "type")}
    >
      <TabsList className="w-full">
        <TabsTrigger
          value="expense"
          className="w-full"
          disabled={isLoading}
          aria-controls={undefined} //it has to be undefined because of a radix ui issue in not having the TabContent
        >
          {dictionary.general.expense}
        </TabsTrigger>
        <TabsTrigger
          value="income"
          className="w-full"
          disabled={isLoading}
          aria-controls={undefined}
        >
           {dictionary.general.income}
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}

export default memo(TypeTabs);
