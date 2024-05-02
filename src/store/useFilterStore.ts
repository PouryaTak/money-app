import { create } from "zustand"

type State = {
    type: string
    categories: string[]
    tags: string[]
    actions: {
        setType: (value: string) => void
        toggleCategories: (category: string) => void
        toggleTags: (tag: string) => void
    }
}

const useFilterStore = create<State>((set) => ({
    type: "all",
    categories: [],
    tags:[],
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
        toggleTags: (tag) =>
            set((state) => {
                const index = state.tags.indexOf(tag)
                if (index === -1) {
                    return {
                        tags: [...state.tags, tag],
                    }
                } else {
                    return {
                        tags: state.tags.filter((c) => c !== tag),
                    }
                }
            }),
    },
}))

export default useFilterStore
