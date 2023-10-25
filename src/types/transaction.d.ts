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

export type TransactionListProps = {
  status: string;
  sortedTransactions: Array<any>;
  handleEdit: (item: Transaction) => void;
  handleDelete: (item: Transaction) => void;
  dictionary: any
};
