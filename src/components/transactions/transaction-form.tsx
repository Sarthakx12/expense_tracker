'use client'

import * as React from 'react'
import { useState, useTransition } from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Category, Transaction } from '@/types'
import { createTransaction, updateTransaction } from '@/app/(protected)/transactions/actions'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'

interface TransactionFormProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  categories: Category[]
  transactionToEdit: Transaction | null
  onSuccess?: () => void
}

export function TransactionForm({
  isOpen,
  onOpenChange,
  categories,
  transactionToEdit,
  onSuccess,
}: TransactionFormProps) {
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  // Initialize state based on editing or new transaction
  const [amount, setAmount] = useState(() => {
    if (transactionToEdit) return Math.abs(transactionToEdit.amount).toString()
    return ''
  })
  
  const [type, setType] = useState<'expense' | 'income'>(() => {
    if (transactionToEdit) return transactionToEdit.type
    return 'expense'
  })

  const [categoryId, setCategoryId] = useState(() => {
    if (transactionToEdit) return transactionToEdit.category_id || ''
    const initialType = transactionToEdit ? transactionToEdit.type : 'expense'
    const filtered = categories.filter((cat) => cat.type === initialType)
    return filtered.length > 0 ? filtered[0].id : ''
  })

  const [merchant, setMerchant] = useState(() => {
    if (transactionToEdit) return transactionToEdit.merchant || ''
    return ''
  })

  const [date, setDate] = useState(() => {
    if (transactionToEdit) return transactionToEdit.date
    const today = new Date()
    const yyyy = today.getFullYear()
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const dd = String(today.getDate()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}`
  })

  const [notes, setNotes] = useState(() => {
    if (transactionToEdit) return transactionToEdit.notes || ''
    return ''
  })

  // Filter categories by selected type for the render
  const filteredCategories = categories.filter((cat) => cat.type === type)

  // Type change handler to update categories list and set valid category ID
  const handleTypeChange = (newType: 'expense' | 'income') => {
    setType(newType)
    const filtered = categories.filter((cat) => cat.type === newType)
    if (filtered.length > 0) {
      setCategoryId(filtered[0].id)
    } else {
      setCategoryId('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const parsedAmount = parseFloat(amount)
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount greater than 0.')
      return
    }

    if (!categoryId) {
      setError('Please select a category.')
      return
    }

    if (!merchant?.trim()) {
      setError('Please enter a merchant name.')
      return
    }

    if (!date) {
      setError('Please select a date.')
      return
    }

    startTransition(async () => {
      try {
        const payload = {
          amount: parsedAmount,
          type,
          category_id: categoryId,
          merchant: merchant.trim(),
          date,
          notes: notes.trim() || null,
        }

        if (transactionToEdit) {
          await updateTransaction(transactionToEdit.id, payload)
        } else {
          await createTransaction(payload)
        }

        onOpenChange(false)
        if (onSuccess) onSuccess()
      } catch (err: unknown) {
        console.error(err)
        const errorMessage = err instanceof Error ? err.message : 'An error occurred while saving.'
        setError(errorMessage)
      }
    })
  }

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="bg-zinc-950 border-zinc-800 text-zinc-100 w-full sm:max-w-md p-6 overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="text-xl font-bold bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
            {transactionToEdit ? 'Edit Transaction' : 'Add Transaction'}
          </SheetTitle>
          <SheetDescription className="text-zinc-400 text-sm">
            {transactionToEdit
              ? 'Update the transaction details below. Your dashboard will refresh instantly.'
              : 'Add a new manual transaction to your ledger. Source will be marked as manual.'}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg">
              {error}
            </div>
          )}

          {/* Transaction Type Toggle */}
          <div className="space-y-2">
            <Label className="text-zinc-400">Transaction Type</Label>
            <div className="grid grid-cols-2 gap-2 bg-zinc-900/60 p-1 rounded-lg border border-zinc-800/80">
              <button
                type="button"
                onClick={() => handleTypeChange('expense')}
                className={cn(
                  "py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  type === 'expense'
                    ? "bg-red-500/10 text-red-400 border border-red-500/20 shadow-md shadow-red-500/5"
                    : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                )}
              >
                Expense
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('income')}
                className={cn(
                  "py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer",
                  type === 'income'
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-md shadow-emerald-500/5"
                    : "text-zinc-400 hover:text-zinc-200 border border-transparent"
                )}
              >
                Income
              </button>
            </div>
          </div>

          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-zinc-400">Amount (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">₹</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-7 bg-zinc-900/40 border-zinc-800 focus:border-zinc-700 text-zinc-100"
                required
                disabled={isPending}
              />
            </div>
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <Label htmlFor="category" className="text-zinc-400">Category</Label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="h-8 w-full rounded-lg border border-zinc-800 bg-zinc-900/40 px-2.5 py-1 text-sm text-zinc-100 outline-none transition-colors focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 disabled:opacity-50"
              required
              disabled={isPending}
            >
              {filteredCategories.length === 0 ? (
                <option value="">No categories available</option>
              ) : (
                filteredCategories.map((cat) => (
                  <option key={cat.id} value={cat.id} className="bg-zinc-950 text-zinc-100">
                    {cat.name}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Merchant Input */}
          <div className="space-y-2">
            <Label htmlFor="merchant" className="text-zinc-400">Merchant</Label>
            <Input
              id="merchant"
              type="text"
              placeholder="e.g. Starbucks, Amazon, Rent"
              value={merchant}
              onChange={(e) => setMerchant(e.target.value)}
              className="bg-zinc-900/40 border-zinc-800 focus:border-zinc-700 text-zinc-100"
              required
              disabled={isPending}
            />
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <Label htmlFor="date" className="text-zinc-400">Date</Label>
            <div className="relative">
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="bg-zinc-900/40 border-zinc-800 focus:border-zinc-700 text-zinc-100"
                required
                disabled={isPending}
              />
            </div>
          </div>

          {/* Note Input */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-zinc-400">Note (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="Add details about this transaction..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="bg-zinc-900/40 border-zinc-800 focus:border-zinc-700 text-zinc-100 resize-none h-20"
              disabled={isPending}
            />
          </div>

          {/* Submit Buttons */}
          <div className="pt-4 flex items-center justify-end gap-3 border-t border-zinc-900">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              className="border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer transition-colors shadow-lg shadow-indigo-600/20"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Transaction'
              )}
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  )
}
