'use client'
import { TransactionContext } from '@/context/transaction-provider'
import React, {useContext, useState} from 'react'

export default function TransactionList() {
  const { transactions, deleteTransaction } = useContext(TransactionContext)
  const [filteredList, setFilteredList] = useState([])
  const [filter, setFilter] = useState('')

 
  return (
    <div className='flex flex-col gap-3 my-3'>
      {Boolean(transactions.length) &&
        transactions.map(i => (
          <div key={i.id} className='grid grid-cols-[40px_2fr_1fr] gap-2 grid-rows-2 bg-white p-5'>
            <div className={`col-span-1 row-start-1 row-end-3 text-center ${i.type == 'expense' ? 'text-red-500' : 'text-green-500' }`}>
              ||
            </div>
            <div className="col-start-2 col-end-3 row-start-1 row-end-2">
              {i.amount || '-'}
            </div>
            <div className="col-start-2 col-end-3 row-start-2 row-end-3 truncate">
              {i.category || '-'}
            </div>
            <div className="col-start-3 col-end-4 row-start-1 row-end-2 text-end truncate">
              {i.date || '-'}
            </div>
            <div className="col-start-3 col-end-4 row-start-2 row-end-3 text-end truncate">
              <button onClick={()=>deleteTransaction(i.id)} className='text-red-500'>delete</button>
            </div>

          </div>
        ))
      }
    </div>
  )
}
