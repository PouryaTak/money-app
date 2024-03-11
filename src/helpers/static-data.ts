import { Transaction } from "@/types/transaction"

export const categories: any = {
    expense: {
        Shopping: {
            icon: "ShoppingCart",
            color: "#FF8787",
        },
        Food: {
            icon: "Utensils",
            color: "#FFEB83",
        },
        Bills: { icon: "Receipt", color: "#FFBF84" },
        Relations: { icon: "Users", color: "#D99EF4" },
        Maintenance: { icon: "Wrench", color: "#FFA0CE" },
        Rent: { icon: "Home", color: "#DF7575" },
    },
    income: {
        Salary: { icon: "Banknote", color: "#78D8A7" },
        Loan: { icon: "Landmark", color: "#8EB19F" },
        Sell: { icon: "Tags", color: "#83E9FF" },
        Investment: {
            icon: "BadgePercent",
            color: "#8DBAFD",
        },
        Bonus: {
            icon: "BadgePlus",
            color: "#CFDFFF",
        },
    },
}

export const types = [
    { key: "expense", value: "Expense" },
    { key: "income", value: "Income" },
]

export const initialForm: Transaction = {
    type: "expense",
    category: "Shopping",
    title: "",
    date: "",
    amount: "",
    desc: "",
    id: "",
}

export const initialSettingsState = {
    lang: "en-US",
    calender: "gregorian",
    currency: "$",
}

export const settingsTabItems = {
    LangTabs: [
        { title: "English", value: "en-US" },
        { title: "فارسی", value: "fa-IR" },
    ],
    CalTabs: [
        { title: "Gregorian", value: "gregorian" },
        { title: "Jalali", value: "jalali" },
    ],
    CurrencyTabs: [
        { title: "Dollar ($)", value: "$" },
        { title: "Rials (IRR)", value: "IRR" },
        { title: "Custom", value: "custom" },
    ],
}

export const navLinks = [
    {
        title: "home",
        href: "/",
        icon: "Home",
    },
    {
        title: "chart",
        href: "/chart",
        icon: "PieChart",
    },
]
