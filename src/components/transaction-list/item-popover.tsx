import React from "react";
import { MoreHorizontal, PencilLine, Trash2 } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "../ui/button";

export default function TransactionListItemPopover({
  handleEditTransaction,
  handleDeleteTransaction,
}: {
  handleEditTransaction: () => void;
  handleDeleteTransaction: () => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant={"ghost"} className="p-0 h-5">
          <MoreHorizontal className="text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-max p-1">
        <Button variant={"ghost"} onClick={handleEditTransaction} className="text-gray-500 ">
          <PencilLine size={16} />
        </Button>
        <Button variant={"ghost"} onClick={handleDeleteTransaction} className="text-red-500 ">
          <Trash2 size={16} />
        </Button>
      </PopoverContent>
    </Popover>
  );
}
