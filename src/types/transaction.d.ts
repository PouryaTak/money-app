export type Transaction = {
  _id?: string;
  type: "expense" | "income";
  category: string;
  title: string;
  date: string;
  amount: string;
  desc: string;
  id: string;
  tags: string[];
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
  getTransactionDetails: (id:string) => void;
  dictionary: any
  settings: any
};
