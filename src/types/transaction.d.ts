export type Transaction = {
  _id?: string;
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
  amount: number;
  color: string;
};
