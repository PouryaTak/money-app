import { Settings } from "./settings"
import { Transaction } from "./transaction"

export type DropdownProps = {
    items: { value: string; title: string }[]
    selected: string
    setSelected: (item: string) => void
}

export type ChartProps = { expenseData: Array<CategorizedTransaction>; incomeData:Array<CategorizedTransaction>; isLoading: boolean; dictionary: any }

export type CalenderInputProps = {
    isLoading: boolean
    transactionDate: Transaction["date"]
    onOptionChange: Function
    dictionary: any
    settings: Settings
}

export type Action = { type: string; payload: { prop: string; value: string } }
