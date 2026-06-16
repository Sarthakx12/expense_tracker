'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react'
import { formatCurrency } from '@/lib/currency'
import { cn } from '@/lib/utils'

interface SummaryCardsProps {
  currency: string
  totalIncome: number
  totalExpense: number
  netBalance: number
  incomeChangePercent: number
  expenseChangePercent: number
  netBalanceChangePercent: number
}

export function SummaryCards({
  currency,
  totalIncome,
  totalExpense,
  netBalance,
  incomeChangePercent,
  expenseChangePercent,
  netBalanceChangePercent,
}: SummaryCardsProps) {
  
  const renderTrend = (value: number, type: 'income' | 'expense' | 'balance') => {
    // Determine colors/directions
    const isPositive = value >= 0
    let textClass = ''
    
    if (type === 'expense') {
      // For expense, negative is good (decrease)
      textClass = isPositive ? 'text-red-400' : 'text-emerald-400'
    } else {
      textClass = isPositive ? 'text-emerald-400' : 'text-red-400'
    }

    const absValue = Math.abs(value)
    
    return (
      <span className={cn("text-xs font-bold flex items-center gap-0.5", textClass)}>
        {isPositive ? (
          <ArrowUpRight className="h-3 w-3 shrink-0" />
        ) : (
          <ArrowDownRight className="h-3 w-3 shrink-0" />
        )}
        {absValue}% <span className="text-zinc-550 font-normal ml-0.5">vs last month</span>
      </span>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {/* Net Balance Card */}
      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-600" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold text-zinc-400">Net Balance</CardTitle>
          <Wallet className="h-4.5 w-4.5 text-indigo-400" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            {formatCurrency(netBalance, currency)}
          </div>
          {renderTrend(netBalanceChangePercent, 'balance')}
        </CardContent>
      </Card>

      {/* Income Card */}
      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-600" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold text-zinc-400">Total Income</CardTitle>
          <ArrowUpRight className="h-4.5 w-4.5 text-emerald-400" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            {formatCurrency(totalIncome, currency)}
          </div>
          {renderTrend(incomeChangePercent, 'income')}
        </CardContent>
      </Card>

      {/* Expenses Card */}
      <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-md relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-rose-500 to-red-600" />
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-semibold text-zinc-400">Total Expenses</CardTitle>
          <ArrowDownRight className="h-4.5 w-4.5 text-red-400" />
        </CardHeader>
        <CardContent className="space-y-1.5">
          <div className="text-3xl font-extrabold text-zinc-100 tracking-tight">
            {formatCurrency(totalExpense, currency)}
          </div>
          {renderTrend(expenseChangePercent, 'expense')}
        </CardContent>
      </Card>
    </div>
  )
}
