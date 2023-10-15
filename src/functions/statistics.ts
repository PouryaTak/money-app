import { categories } from "@/helpers/static-data";
import { CategorizedTransaction, Transaction } from "@/types/transaction";

export const calculateAmountByType = (
  startDate: any,
  endDate: any,
  transactions: Array<Transaction>,
  type: "expense" | "income",
): number => {
  return transactions.reduce(
    (totalAmount: number, transaction: Transaction) => {
      if (
        transaction.type === type &&
        transaction.date >= startDate &&
        transaction.date <= endDate
      ) {
        totalAmount += Number(transaction.amount);
      }
      return totalAmount;
    },
    0,
  );
};

export const groupTransactionsByTypeCategory = (
  startDate: any,
  endDate: any,
  transactions: Transaction[],
  type: "expense" | "income",
): Array<CategorizedTransaction> => {
  const findCategory = (category: string) =>
    categories[type].find((i: any) => i.key == category);
  const transactionObj: { [key: string]: number } = {};

  transactions.forEach((item) => {
    if (item.type === type && item.date >= startDate && item.date <= endDate) {
      const amount: number = Number(item.amount);
      item.category in transactionObj
        ? (transactionObj[item.category] += amount)
        : (transactionObj[item.category] = amount);
    }
  });

  return Object.entries(transactionObj).map((item: [string, number]) => {
    return {
      type,
      category: findCategory(item[0])?.value,
      id: item[0],
      color: findCategory(item[0])?.color || "#eee",
      amount: item[1],
    };
  });
};

export const convertChartData = (
  data: Array<CategorizedTransaction>,
): Array<{ x: string; y: number }> => {
  return data.map((item: CategorizedTransaction) => ({
    x: item.category,
    y: item.amount,
    color: item.color,
  }));
};
