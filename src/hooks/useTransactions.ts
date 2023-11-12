"use client"
import { DateContext } from "@/providers/date-provider"
import { getTransactions } from "@/functions/api/transactions"
import { useContext } from "react"
import { useQuery } from "react-query"

export default function useTransactions() {
    const { selectedDate } = useContext(DateContext)

    const response = useQuery({
        staleTime: Infinity,
        cacheTime: 1000 * 60 * 60,
        queryKey: ["transactions", { selectedDate }],
        queryFn: () =>
        getTransactions(selectedDate.startDate, selectedDate.endDate),
    })

    return response
}
