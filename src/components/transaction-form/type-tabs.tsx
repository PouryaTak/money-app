import React, { memo } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Transaction } from "@/types/transaction";

function TypeTabs({
  isLoading,
  transactionType,
  onOptionChange,
  dictionary
}: {
  isLoading: boolean;
  transactionType: Transaction["type"];
  onOptionChange: Function;
  dictionary:any
}) {
  return (
    <Tabs
      defaultValue="expense"
      value={transactionType}
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
