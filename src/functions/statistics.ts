import { Transaction } from "@/types/transaction";

export const calculateAmountByType = (
  startDate: any,
  endDate: any,
  transactions: Transaction[],
  type: "expense" | "income"
) => {
  let transaction = 0;
  transactions.forEach((i) => {
    if (i.date <= endDate && i.date >= startDate) {
      i.type === type && (transaction += +i.amount);
    }
  });
  return transaction;
};
