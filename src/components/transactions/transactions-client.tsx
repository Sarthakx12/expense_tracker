'use client'

import * as React from 'react'
import { useState } from 'react'
import { TransactionTable } from './transaction-table'
import { TransactionFilters } from './transaction-filters'
import { Pagination } from './pagination'
import { TransactionForm } from './transaction-form'
import { Button } from '@/components/ui/button'
import { Category, TransactionWithCategory } from '@/types'
import { useSearchParams } from 'next/navigation'
import { Plus } from 'lucide-react'

interface TransactionsClientProps {
  initialData: {
    data: TransactionWithCategory[]
    count: number
    page: number
    pageSize: number
  }
  categories: Category[]
}

export function TransactionsClient({ initialData, categories }: TransactionsClientProps) {
  const searchParams = useSearchParams()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [txToEdit, setTxToEdit] = useState<TransactionWithCategory | null>(null)

  const handleEdit = (tx: TransactionWithCategory) => {
    // Strip nested category object for the DB mutation type format matching form state
    const cleanTx = {
      ...tx,
      category_id: tx.category_id
    }
    setTxToEdit(cleanTx as unknown as TransactionWithCategory)
    setIsFormOpen(true)
  }

  const handleAdd = () => {
    setTxToEdit(null)
    setIsFormOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Transactions</h1>
          <p className="text-zinc-400 mt-1">Manage and track your manual transactions below.</p>
        </div>
        <Button
          onClick={handleAdd}
          className="bg-indigo-650 hover:bg-indigo-600 text-white cursor-pointer h-9 px-4 gap-1.5 self-start sm:self-auto shadow-lg shadow-indigo-600/10 transition-all active:scale-[0.98] border-0"
        >
          <Plus className="h-4 w-4" />
          Add Transaction
        </Button>
      </div>

      <TransactionFilters key={searchParams.toString()} categories={categories} />

      <TransactionTable
        transactions={initialData.data}
        onEdit={handleEdit}
      />

      <Pagination
        page={initialData.page}
        totalCount={initialData.count}
        pageSize={initialData.pageSize}
      />

      <TransactionForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        categories={categories}
        transactionToEdit={txToEdit}
      />
    </div>
  )
}
