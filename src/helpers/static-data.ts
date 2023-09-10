export const categories:any = {
    'expense': [
      { key: "item01", value: "Shopping", icon: "ShoppingCart", color: "#9b5de5" },
      { key: "item02", value: "Food", icon: 'Utensils', color: "#f15bb5" },
      { key: "item03", value: "Bills", icon: "Receipt", color: "#fe7f2d" },
      { key: "item04", value: "Relations", icon: "Users", color: "#00bbf9" },
      { key: "item05", value: "Maintenance", icon: "Wrench", color: "#5fa8d3" },
    ],
    'income': [
      { key: "item01", value: "Salary", icon: 'Banknote', color: "#ffbc42" },
      { key: "item02", value: "Loan", icon: "Landmark", color: "#d81159" },
      { key: "item03", value: "Sell", icon: "Tags", color: "#218380" },
      { key: "item04", value: "ّInterest", icon: "BadgePercent", color: "#a1c181" },
    ],
  };
  
  export const types = [
    { key: "expense", value: "Expense" },
    { key: "income", value: "Income" },
  ];
  
  export const initialForm = {
    type: "expense",
    category: "item01",
    title: "",
    date: "",
    amount: "",
    desc: "",
    id: "",
  };