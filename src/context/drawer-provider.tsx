import { createContext, useState } from "react";

export const DrawerContext = createContext<any>({});
export default function DrawerProvider({ children }: any) {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  return <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>{children}</DrawerContext.Provider>;
}
