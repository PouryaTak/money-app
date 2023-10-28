export const categories: any = {
    expense: [
        {
            key: "item01",
            value: "Shopping",
            icon: "ShoppingCart",
            color: "#9b5de5",
        },
        {
            key: "item02",
            value: "Food",
            icon: "Utensils",
            color: "hsl(358, 70%, 50%)",
        },
        { key: "item03", value: "Bills", icon: "Receipt", color: "#fe7f2d" },
        { key: "item04", value: "Relations", icon: "Users", color: "#00bbf9" },
        { key: "item05", value: "Maintenance", icon: "Wrench", color: "#5fa8d3" },
        { key: "item06", value: "Rent", icon: "Home", color: "#ff88d3" },
    ],
    income: [
        { key: "item01", value: "Salary", icon: "Banknote", color: "#ffbc42" },
        { key: "item02", value: "Loan", icon: "Landmark", color: "#d81159" },
        { key: "item03", value: "Sell", icon: "Tags", color: "#218380" },
        {
            key: "item04",
            value: "ّInvestment",
            icon: "BadgePercent",
            color: "#a1c181",
        },
        {
            key: "item05",
            value: "ّBonus",
            icon: "BadgePlus",
            color: "#6185f1",
        },
    ],
}

export const types = [
    { key: "expense", value: "Expense" },
    { key: "income", value: "Income" },
]

export const initialForm = {
    type: "expense",
    category: "item01",
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
