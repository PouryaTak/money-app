"use client";

import { createContext } from "react";

export const DictionaryContext = createContext<any>({});
export default function DictionaryProvider({
  children,
  dictionary,
}: {
  children: React.ReactNode;
  dictionary: any;
}) {
  return (
    <DictionaryContext.Provider value={{ dictionary }}>
      {children}
    </DictionaryContext.Provider>
  );
}
