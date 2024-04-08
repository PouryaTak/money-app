import React, { memo } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Transaction } from "@/types/transaction"

type Props = {
    isLoading: boolean
    currentValue: string
    values: {
      value: string
      label: string
  }[]
    onOptionChange: Function
}

function TypeTabs({ isLoading, currentValue, onOptionChange, values }: Props) {
    return (
        <Tabs
            defaultValue="expense"
            value={currentValue}
            className="w-full"
            onValueChange={(e) => onOptionChange(e, "type")}
        >
            <TabsList className="w-full">
                {values.map((i) => (
                    <TabsTrigger
                        key={i.value}
                        value={i.value}
                        className="w-full"
                        disabled={isLoading}
                        aria-controls={undefined} //it has to be undefined because of a radix ui issue in not having the TabContent
                    >
                        {i.label}
                    </TabsTrigger>
                ))}

                {/* <TabsTrigger value="income" className="w-full" disabled={isLoading} aria-controls={undefined}>
                    {dictionary.general.income}
                </TabsTrigger> */}
            </TabsList>
        </Tabs>
    )
}

export default memo(TypeTabs)
