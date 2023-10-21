import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { DropdownProps } from "@/types/general";

export default function DropDown({ items, selected, setSelected }: DropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex justify-between items-center w-full py-2 px-3 bg-gray-100 rounded-lg mb-5">
        <span>{selected}</span>
        <ChevronDown size={16} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup value={selected} onValueChange={setSelected}>
          {items.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              {item.title}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
