'use client'

import * as React from 'react'
import { useState, useTransition } from 'react'
import { TransactionWithCategory } from '@/types'
import { deleteTransaction } from '@/app/(protected)/transactions/actions'
import { formatCurrency, formatDate, getCategoryIcon } from '@/lib/currency'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Edit2, Trash2, ArrowLeftRight, Loader2, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TransactionTableProps {
  transactions: TransactionWithCategory[]
  onEdit: (transaction: TransactionWithCategory) => void
  onDeleteSuccess?: () => void
}

export function TransactionTable({
  transactions,
  onEdit,
  onDeleteSuccess,
}: TransactionTableProps) {
  const [, startTransition] = useTransition()
  const [txToDelete, setTxToDelete] = useState<TransactionWithCategory | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const handleDeleteConfirm = () => {
    if (!txToDelete) return
    
    setDeleteError(null)
    setIsDeleting(true)
    
    startTransition(async () => {
      try {
        await deleteTransaction(txToDelete.id)
        setTxToDelete(null)
        if (onDeleteSuccess) onDeleteSuccess()
      } catch (err: unknown) {
        console.error(err)
        const error = err instanceof Error ? err : new Error('Deletion failed')
        setDeleteError(error.message || 'Failed to delete transaction.')
      } finally {
        setIsDeleting(false)
      }
    })
  }

  // Helper for source badge classes
  const getSourceBadgeClass = (source: string) => {
    switch (source) {
      case 'manual':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'recurring':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20'
      case 'import':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20'
      default:
        return 'bg-zinc-500/10 text-zinc-400 border-zinc-550/20'
    }
  }

  // Render Category colored icon block
  const renderCategoryInfo = (category: TransactionWithCategory['category']) => {
    if (!category) {
      return (
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-zinc-800 text-zinc-500">
            <ArrowLeftRight className="h-4 w-4" />
          </div>
          <span className="text-zinc-500 italic text-sm">Uncategorized</span>
        </div>
      )
    }

    const IconComponent = getCategoryIcon(category.icon)
    const color = category.color || '#71717a'

    return (
      <div className="flex items-center gap-2.5">
        <div
          className="flex items-center justify-center h-7 w-7 rounded-lg text-white shadow-sm shrink-0"
          style={{ backgroundColor: color }}
        >
          <IconComponent className="h-4 w-4" />
        </div>
        <span className="text-zinc-200 font-medium text-sm">{category.name}</span>
      </div>
    )
  }

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center p-8 min-h-[350px] bg-zinc-900/15 border border-dashed border-zinc-800/80 rounded-2xl backdrop-blur-xs">
        <div className="h-12 w-12 rounded-xl bg-zinc-900 flex items-center justify-center border border-zinc-850 shadow-inner mb-4">
          <ArrowLeftRight className="h-6 w-6 text-zinc-600" />
        </div>
        <h3 className="text-lg font-bold text-zinc-300">No transactions found</h3>
        <p className="text-sm text-zinc-500 max-w-sm mt-1.5">
          There are no transactions matching your active filters. Try clearing filters or adding a new transaction.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Desktop View */}
      <div className="hidden md:block overflow-hidden bg-zinc-950 border border-zinc-850 rounded-xl shadow-2xl shadow-black/40">
        <table className="min-w-full divide-y divide-zinc-900">
          <thead className="bg-zinc-900/20">
            <tr>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Date</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Merchant</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Category</th>
              <th scope="col" className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-zinc-400">Source</th>
              <th scope="col" className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-zinc-400">Amount</th>
              <th scope="col" className="relative px-6 py-3.5"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-900/80 bg-transparent">
            {transactions.map((tx) => {
              const isExpense = tx.type === 'expense'
              return (
                <tr key={tx.id} className="hover:bg-zinc-900/30 transition-colors group">
                  <td className="whitespace-nowrap px-6 py-3.5 text-sm text-zinc-400 font-medium">
                    {formatDate(tx.date)}
                  </td>
                  <td className="px-6 py-3.5 text-sm">
                    <div className="flex flex-col">
                      <span className="font-semibold text-zinc-200">{tx.merchant}</span>
                      {tx.notes && <span className="text-xs text-zinc-500 mt-0.5 line-clamp-1">{tx.notes}</span>}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5 text-sm">
                    {renderCategoryInfo(tx.category)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5 text-sm">
                    <Badge variant="outline" className={cn("text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider shrink-0", getSourceBadgeClass(tx.source))}>
                      {tx.source}
                    </Badge>
                  </td>
                  <td className={cn(
                    "whitespace-nowrap px-6 py-3.5 text-right text-sm font-bold",
                    isExpense ? "text-red-400" : "text-emerald-400"
                  )}>
                    {isExpense ? '-' : '+'}{formatCurrency(tx.amount)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-3.5 text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => onEdit(tx)}
                        className="text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900 cursor-pointer"
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        onClick={() => setTxToDelete(tx)}
                        className="text-zinc-500 hover:text-red-400 hover:bg-red-950/20 cursor-pointer"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {transactions.map((tx) => {
          const isExpense = tx.type === 'expense'
          const catColor = tx.category?.color || '#71717a'
          const IconComponent = getCategoryIcon(tx.category?.icon)
          return (
            <div key={tx.id} className="bg-zinc-950 border border-zinc-850 p-4 rounded-xl space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs text-zinc-500 font-semibold">{formatDate(tx.date)}</span>
                <Badge variant="outline" className={cn("text-[9px] px-1.5 py-0.2 font-bold uppercase tracking-wider", getSourceBadgeClass(tx.source))}>
                  {tx.source}
                </Badge>
              </div>

              <div className="flex items-start justify-between">
                <div className="space-y-1.5">
                  <div className="font-bold text-zinc-100">{tx.merchant}</div>
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center justify-center h-5 w-5 rounded-md text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: catColor }}
                    >
                      <IconComponent className="h-3 w-3" />
                    </div>
                    <span className="text-xs text-zinc-300 font-medium">{tx.category?.name || 'Uncategorized'}</span>
                  </div>
                  {tx.notes && <p className="text-xs text-zinc-500 italic mt-1">{tx.notes}</p>}
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <div className={cn("text-base font-bold", isExpense ? "text-red-400" : "text-emerald-400")}>
                    {isExpense ? '-' : '+'}{formatCurrency(tx.amount)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => onEdit(tx)}
                      className="text-zinc-500 hover:text-zinc-200 bg-zinc-900/40 cursor-pointer"
                    >
                      <Edit2 className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setTxToDelete(tx)}
                      className="text-zinc-500 hover:text-red-400 bg-red-950/10 cursor-pointer"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={txToDelete !== null} onOpenChange={(open) => { if (!open) setTxToDelete(null) }}>
        <DialogContent className="bg-zinc-950 border border-zinc-800/80 text-zinc-100 p-6 sm:max-w-md">
          <DialogHeader>
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-red-500/10 text-red-500 mb-4 border border-red-500/20">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <DialogTitle className="text-lg font-bold text-center text-zinc-100">
              Confirm Transaction Deletion
            </DialogTitle>
            <DialogDescription className="text-zinc-400 text-xs text-center mt-2 leading-relaxed">
              Are you sure you want to delete this transaction for{' '}
              <strong className="text-zinc-200">
                {txToDelete?.merchant} ({formatCurrency(txToDelete?.amount || 0)})
              </strong>
              ? This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {deleteError && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-lg text-center mt-2">
              {deleteError}
            </div>
          )}

          <DialogFooter className="mt-6 flex flex-row items-center gap-3 justify-center">
            <DialogClose
              render={
                <Button
                  variant="outline"
                  disabled={isDeleting}
                  className="flex-1 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 cursor-pointer"
                >
                  Cancel
                </Button>
              }
            />
            <Button
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="flex-1 bg-red-600 hover:bg-red-500 text-white cursor-pointer transition-colors shadow-lg shadow-red-600/20"
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
