export type Transaction = {
  _id?: string;
  type: "expense" | "income";
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
  percentage:string
};

export type TransactionListProps = {
  // status: string;
  isLoading: boolean
  isError:boolean
  sortedTransactions: Array<any>;
  handleEdit: (item: Transaction) => void;
  handleDelete: (item: Transaction) => void;
  dictionary: any
  settings: any
};
