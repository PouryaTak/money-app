import React from "react"
import { useQuery } from "react-query"
import { getSingleTransaction } from "@/functions/api/transactions"
import useTransactionForm from "@/hooks/useTransactionForm"

const TransactionDetails = () => {
    const { currentTransaction } = useTransactionForm()
    const {data, isLoading} = useQuery({
        queryKey:['getTransactionDetails', currentTransaction._id],
        queryFn: () => getSingleTransaction(currentTransaction._id!)
    })

    if(isLoading) {
        return <span>is Loading...</span>
    }
    
    return (
        <div className="[&>h2]:font-semibold [&>p]:mb-3">
            <h2 className="text-center mb-5">{data.transaction.title}</h2>
            <h2>amount</h2>
            <p>{data.transaction.amount}</p>
            <h2>date</h2>
            <p>{data.transaction.date}</p>
            <h2>category</h2>
            <p>
                {data.transaction.category}-{data.transaction.type}
            </p>
            <h2>desc</h2>
            <p>{data.transaction.desc || ''}</p>
            <h2>created at</h2>
            <p>{data.transaction.createdAt!}</p>
        </div>
    )
}

export default TransactionDetails
