export type Transaction = {
  type: string;
  category: string;
  title: string;
  date: string;
  amount: string;
  desc: string;
  id: string;
};

export type CategorizedTransaction = {
  type: "expense" | "income";
  category: string;
  id: string;
  value: number;
  color: string;
};
