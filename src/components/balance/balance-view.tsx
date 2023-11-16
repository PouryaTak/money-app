import { numberSeparator } from "@/functions/handle-numbers"
import React from "react"

type BalanceProp = {
    dictionary: any
    calcExpenses: number
    calcIncomes: number
    gradientPosition:number | null
    isLoading:boolean
}

export default function BalanceView({ dictionary, calcExpenses, calcIncomes, gradientPosition, isLoading }: BalanceProp) {
    return (
        <div className="relative">
            <div className="w-full bg-slate-200 bottom-0 h-24 rounded-b-[38px]" style={{background: gradientPosition !== null ? `linear-gradient(to left, #98FFD4 ${gradientPosition}%, #FFB9B9 ${gradientPosition}% 100%)`:''}}></div>
            <div className="flex flex-col gap-2 w-full absolute top-0 bg-white px-8 pt-2 pb-5 rounded-b-[38px] z-10">
                <div className="w-full flex justify-between">
                    <span className="font-bold text-sm text-red-400">{dictionary.general.expenses}</span>
                    <span className="text-red-400 text-sm font-bold block">{ isLoading ? '...' : `- ${numberSeparator(calcExpenses)}`}</span>
                </div>
                <hr className="border-dashed" />
                <div className="w-full flex justify-between">
                    <span className="font-bold text-sm text-green-400">{dictionary.general.incomes}</span>
                    <span className="text-green-400 text-sm font-bold block">{isLoading ? '...' : `+ ${numberSeparator(calcIncomes)}`}</span>
                </div>
            </div>
        </div>
    )
}
