import { DrawerContentsProps } from "@/components/drawer-contents";

export type DrawerContextType = {
    isDrawerOpen: boolean;
    setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    query: DrawerContentsProps | '';
    setQuery: React.Dispatch<React.SetStateAction<DrawerContentsProps | ''>>;
  }
