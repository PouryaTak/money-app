"use client"
import { DateContext } from "@/providers/date-provider"
import { getTransactions } from "@/functions/api/transactions"
import { useContext } from "react"
import { useQuery } from "react-query"
import useFilterStore from "@/store/useFilterStore"

export default function useTransactions() {
    const { selectedDate } = useContext(DateContext)
    const { type, categories } = useFilterStore((state) => state)

    const response = useQuery({
        staleTime: Infinity,
        cacheTime: 1000 * 60 * 60,
        queryKey: ["transactions", { selectedDate }, type, ...categories],
        queryFn: () => getTransactions(selectedDate.startDate, selectedDate.endDate, type, categories),
    })

    return response
}
