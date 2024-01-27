import { DrawerContentsProps } from '@/components/drawer-contents'
import { create } from 'zustand'

type State = {
    isDrawerOpen: boolean,
    updateFirstName: (state: boolean) => void,
    query: DrawerContentsProps | "",
    setQuery: (query: DrawerContentsProps) => void
}

const usePersonStore = create<State>((set) => ({
    isDrawerOpen: false,
    updateFirstName: (state) => set(() => ({ isDrawerOpen: state })),
    query: "",
    setQuery: (query:any) => set(() => ({ query })),
  }))

export default usePersonStore