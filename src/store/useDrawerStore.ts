import { DrawerContentsProps } from "@/components/drawer-contents"
import { create } from "zustand"

type State = {
    isDrawerOpen: boolean
    query: DrawerContentsProps | ""
    actions: {
        setIsDrawerOpen: (state: boolean) => void
        setQuery: (query: DrawerContentsProps | "") => void
    }
}

const useDrawerStore = create<State>((set) => ({
    isDrawerOpen: false,
    query: "",
    actions: {
        setIsDrawerOpen: (state) => set(() => ({ isDrawerOpen: state })),
        setQuery: (query: any) => set(() => ({ query })),
    },
}))

export default useDrawerStore
