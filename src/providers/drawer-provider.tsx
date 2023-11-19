'use client'
import { DrawerContentsProps } from "@/components/drawer-contents";
import { DrawerContextType } from "@/types/drawer";
import { createContext, useState } from "react";

export const DrawerContext = createContext<DrawerContextType>({
  isDrawerOpen: false,
  setIsDrawerOpen: () => {},
  query: "",
  setQuery: () => {},
});

export default function DrawerProvider({ children }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<DrawerContentsProps| "">("");

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen, query, setQuery }}>
      {children}
    </DrawerContext.Provider>
  );
}
