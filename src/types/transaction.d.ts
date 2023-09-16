export interface Transaction {
  type: string;
  category: string;
  title: string;
  date: string;
  amount: string;
  desc: string;
  id: string;
}

export type CategorizedTransaction = {
  type: "expense" | "income";
  category: string;
  amount: number;
};
