import { create } from "zustand"

type State = {
    type: string
    categories: string[]
    actions: {
        setType: (value: string) => void
        toggleCategories: (category: string) => void
    }
}

const useFilterStore = create<State>((set) => ({
    type: "all",
    categories: [],
    actions: {
        setType: (value) => set(() => ({ type: value })),
        toggleCategories: (category) =>
            set((state) => {
                const index = state.categories.indexOf(category)
                if (index === -1) {
                    return {
                        categories: [...state.categories, category],
                    }
                } else {
                    return {
                        categories: state.categories.filter((c) => c !== category),
                    }
                }
            }),
    },
}))

export default useFilterStore
