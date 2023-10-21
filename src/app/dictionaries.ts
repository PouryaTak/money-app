import 'server-only';

export type Dictionaries = keyof typeof dictionaries
const dictionaries = {
    "en-US": () => import("../dictionaries/en-US/en-US.json").then((module)=>module.default),
    "fa-IR": () => import("../dictionaries/fa-IR/fa-IR.json").then((module)=>module.default)
}

export const getDictionaries = async (locale: Dictionaries) => dictionaries[locale]()