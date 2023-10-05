import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calender";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Transaction } from "@/types/transaction";

export default function CalenderInput({
  isLoading,
  currentTransaction,
  onOptionChange,
}: {
  isLoading: boolean;
  currentTransaction: Transaction;
  onOptionChange: Function;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          disabled={isLoading}
          variant={"outline"}
          className={cn("w-full pl-3 text-left font-normal", !currentTransaction.date && "text-muted-foreground")}
        >
          {currentTransaction?.date ? JSON.stringify(currentTransaction.date).slice(1, 11) : <span>--/--/--</span>}
          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="z-50">
        <Calendar
          mode="single"
          selected={currentTransaction.date as any}
          onSelect={(e) => onOptionChange(e, "date")}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
