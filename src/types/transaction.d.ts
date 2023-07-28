export interface Transaction {
    type: string;
    category: string;
    title: string;
    date: string;
    amount: number | string;
    desc: string;
    id:string
  }