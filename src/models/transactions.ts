import mongoose, { Schema } from "mongoose"

const transactionSchema = new Schema(
    {
        type: String,
        category: String,
        title: String,
        date: String,
        amount: String,
        desc: String,
        id: String,
        tags: Array,
        owner: { type: String, required: true },
    },
    {
        timestamps: true,
    }
)

const TransactionModel = mongoose.models.TransactionModel || mongoose.model("TransactionModel", transactionSchema)
export default TransactionModel
