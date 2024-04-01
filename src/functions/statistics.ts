import { categories } from "@/helpers/static-data"
import { CategorizedTransaction, Transaction } from "@/types/transaction"

export const calculateAmountByType = (
    startDate: any,
    endDate: any,
    transactions: Transaction[],
    type: "expense" | "income"
): number => {
    return transactions.reduce((totalAmount: number, transaction: Transaction) => {
        if (transaction?.type === type && transaction?.date >= startDate && transaction?.date <= endDate) {
            totalAmount += Number(transaction?.amount)
        }
        return totalAmount
    }, 0)
}

interface categorizedItem {
    type: "expense" | "income"
    category: string
    id: string
    color: string
    amount: number
    percentage: string
}
export interface GroupTransactionsByTypeCategoryReturn {
    expense: { [category: string]: categorizedItem }
    income: { [category: string]: categorizedItem }
}

export const groupTransactionsByTypeCategory = (
    startDate: any,
    endDate: any,
    transactions: Transaction[]
): GroupTransactionsByTypeCategoryReturn => {
    const transactionObj: { [key in "expense" | "income"]: { [key: string]: categorizedItem } } = {
        expense: {},
        income: {},
    }
    const total = { income: 0, expense: 0 }
    transactions.forEach((item) => {
        total[item.type] += Number(item.amount)
    })


    // sum the total amount and category amount
    transactions.forEach((item) => {
        if (item.date >= startDate && item.date <= endDate) {
            
            const amount: number =
                Number(item.amount) +
                (transactionObj[item.type][item.category]
                    ? transactionObj[item.type][item.category]["amount"]
                    : 0)


            const percentage = ((amount * 100) / total[item.type]).toFixed(2)

            transactionObj[item.type][item.category] = {
                type: item.type,
                category: item.category,
                id: item.category,
                color: categories[item.type][item.category]["color"] || "#eee",
                amount,
                percentage,
            }
        }
    })

    return transactionObj
}

export const convertChartData = (data: Array<CategorizedTransaction>): Array<{ x: string; y: number }> => {
    return data.map((item: CategorizedTransaction) => ({
        x: item.category,
        y: item.amount,
        color: item.color,
    }))
}
