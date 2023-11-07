import { categories } from "@/helpers/static-data"
import { CategorizedTransaction, Transaction } from "@/types/transaction"

export const calculateAmountByType = (
    startDate: any,
    endDate: any,
    transactions: Array<Transaction>,
    type: "expense" | "income"
): number => {
    return transactions.reduce((totalAmount: number, transaction: Transaction) => {
        if (transaction.type === type && transaction.date >= startDate && transaction.date <= endDate) {
            totalAmount += Number(transaction.amount)
        }
        return totalAmount
    }, 0)
}

export const groupTransactionsByTypeCategory = (
    startDate: any,
    endDate: any,
    transactions: Transaction[]
): Array<CategorizedTransaction> => {
    const findCategory = (category: string) =>
        categories["expense"].find((i: any) => i.name == category) ||
        categories["income"].find((i: any) => i.name == category)

    const findType = (categoryValue: string): "expense" | "income" => {
        return categories["expense"].find((i: any) => i.name === categoryValue) ? "expense" : "income"
    }

    const transactionObj: { [key: string]: number } = {}
    const total = { income: 0, expense: 0 }

    transactions.forEach((item) => {
        if (item.date >= startDate && item.date <= endDate) {
            total[item.type] += Number(item.amount)
            const amount: number = Number(item.amount)
            item.category in transactionObj
                ? (transactionObj[item.category] += amount)
                : (transactionObj[item.category] = amount)
        }
    })

    const categorizedTransaction = Object.entries(transactionObj).map((item: [string, number]) => {
        return {
            type: findType(item[0]),
            category: findCategory(item[0])?.name,
            id: item[0],
            color: findCategory(item[0])?.color || "#eee",
            amount: item[1],
            percentage: ((item[1] * 100) / total[findType(item[0])]).toFixed(2)
        }
    })

    return categorizedTransaction
}

export const convertChartData = (data: Array<CategorizedTransaction>): Array<{ x: string; y: number }> => {
    return data.map((item: CategorizedTransaction) => ({
        x: item.category,
        y: item.amount,
        color: item.color,
    }))
}
