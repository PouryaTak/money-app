export const categories: any = {
    expense: [
        {
            name: "Shopping",
            icon: "ShoppingCart",
            color: "#9b5de5",
        },
        {
            name: "Food",
            icon: "Utensils",
            color: "hsl(358, 70%, 50%)",
        },
        { name: "Bills", icon: "Receipt", color: "#fe7f2d" },
        { name: "Relations", icon: "Users", color: "#00bbf9" },
        { name: "Maintenance", icon: "Wrench", color: "#5fa8d3" },
        { name: "Rent", icon: "Home", color: "#ff88d3" },
    ],
    income: [
        { name: "Salary", icon: "Banknote", color: "#ffbc42" },
        { name: "Loan", icon: "Landmark", color: "#d81159" },
        { name: "Sell", icon: "Tags", color: "#218380" },
        {
            name: "ّInvestment",
            icon: "BadgePercent",
            color: "#a1c181",
        },
        {
            name: "ّBonus",
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
