export const categories: any = {
    expense: [
        {
            name: "Shopping",
            icon: "ShoppingCart",
            color: "#FF8787",
        },
        {
            name: "Food",
            icon: "Utensils",
            color: "#FFEB83",
        },
        { name: "Bills", icon: "Receipt", color: "#FFBF84" },
        { name: "Relations", icon: "Users", color: "#D99EF4" },
        { name: "Maintenance", icon: "Wrench", color: "#FFA0CE" },
        { name: "Rent", icon: "Home", color: "#DF7575" },
    ],
    income: [
        { name: "Salary", icon: "Banknote", color: "#78D8A7" },
        { name: "Loan", icon: "Landmark", color: "#8EB19F" },
        { name: "Sell", icon: "Tags", color: "#83E9FF" },
        {
            name: "ّInvestment",
            icon: "BadgePercent",
            color: "#8DBAFD",
        },
        {
            name: "ّBonus",
            icon: "BadgePlus",
            color: "#CFDFFF",
        },
    ],
}

export const types = [
    { key: "expense", value: "Expense" },
    { key: "income", value: "Income" },
]

export const initialForm = {
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
