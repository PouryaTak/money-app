'use client'
import { TransactionContext } from '@/context/transaction-provider'
import React, { useContext } from 'react'

export default function Balance() {
    const { transactions } = useContext(TransactionContext)
    const calcBalance = () => {
        let balance = 0
        transactions.forEach(i => {
            i.type == 'expense' ? balance -= +(i.amount) : balance += +(i.amount)
        });
        return balance
    }
    const calcExpenses = () => {
        let expense = 0
        transactions.forEach(i => {
            i.type == 'expense' && (expense -= +(i.amount))
        });
        return expense
    }
    const calcIncomes = () => {
        let income = 0
        transactions.forEach(i => {
            i.type != 'expense' && (income += +(i.amount))
        });
        return income
    }
  return (
    <div className='w-full flex justify-around items-center text-center p-5 bg-white my-3'>
        <div className='flex flex-col'>
        <span className='text-red-400'>
            {calcExpenses()}
        </span>
        <span className='text-blue-400'>
            {calcIncomes()}
        </span>
        </div>
        <h1 className='font-bold text-2xl'>{calcBalance()}</h1>
    </div>
  )
}
