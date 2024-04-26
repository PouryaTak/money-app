import { Transaction } from "@/types/transaction"

export const categories: any = {
    expense: {
        Shopping: {icon: "ShoppingCart",color: "#FCB951",},
        Food: { icon: "Utensils",color: "#FEB514",},
        Bills: { icon: "Receipt", color: "#FB9C14" },
        Entertainment: { icon: "RollerCoaster", color: "#812EB0" },
        Maintenance: { icon: "Wrench", color: "#F46C14" },
        Personal: { icon: "User", color: "#821A8F" },
        Transportation: { icon: "CarTaxiFront", color: "#EA2914" },
        Healthcare: { icon: "HeartPulse", color: "#E71614" },
        Rent: { icon: "Home", color: "#F15514" },
        Gift: { icon: "Gift", color: "#C61639" },
        Education: { icon: "GraduationCap", color: "#EE5451" },
        Investment: { icon: "Gem", color: "#B5174E" },
        Relations: { icon: "Users", color: "#F78414" },
        Tax: { icon: "Gavel", color: "#ED3C26" },
        Other: { icon: "CircleDotDashed", color: "#B255A1" },
    },
    income: {
        Salary: { icon: "Banknote", color: "#BAFE36" },
        Loan: { icon: "Landmark", color: "#9CFE01" },
        Gift: { icon: "Gift", color: "#4F7DF1" },
        Sell: { icon: "Tags", color: "#47E957" },
        Bonus: { icon: "BadgePlus", color: "#0177E9" },
        Investment: { icon: "BadgePercent", color: "#10A1BA",},
        Other: { icon: "CircleDotDashed", color: "#8A86F4" },
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
    tags: [],
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
