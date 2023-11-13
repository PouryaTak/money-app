import { removeNonNumeric } from "@/lib/utils"
import { Transaction } from "@/types/transaction"

export const prepareNewData = (transaction: Transaction) => {
    transaction.amount = removeNonNumeric(transaction.amount)
    if (!transaction.id) {
        transaction.id = crypto.randomUUID()
    }
    return transaction
}
