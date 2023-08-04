import { Transaction } from "@/types/transaction";

export const calculateAmountByType = ( transactions:Transaction[], type: 'expense' | 'income')=> {
    let transaction = 0
    transactions.forEach(i => {
            i.type === type && (transaction += +(i.amount))
    });
    return transaction
}
