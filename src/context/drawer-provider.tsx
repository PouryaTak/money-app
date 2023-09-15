import { createContext, useState } from "react";

export const DrawerContext = createContext<any>({});
export default function DrawerProvider({ children }: any) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return <DrawerContext.Provider value={{ isOpen, setIsOpen }}>{children}</DrawerContext.Provider>;
}
