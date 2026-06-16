'use client'

import * as React from 'react'
import { formatCurrency } from '@/lib/currency'
import { Store } from 'lucide-react'

interface TopMerchantsProps {
  merchants: {
    name: string
    amount: number
    percentage: number
  }[]
  currency: string
}

export function TopMerchants({ merchants, currency }: TopMerchantsProps) {
  if (merchants.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[260px] text-zinc-500 italic text-sm text-center">
        <Store className="h-8 w-8 text-zinc-700 mb-2" />
        No merchant data recorded this month.
      </div>
    )
  }

  // Find the highest spending merchant to scale progress bars relatively
  const maxAmount = merchants.length > 0 ? merchants[0].amount : 1

  return (
    <div className="space-y-4">
      {merchants.map((merchant, index) => {
        // Calculate relative scale so the top merchant has 100% of the bar width
        const barWidth = `${Math.round((merchant.amount / maxAmount) * 100)}%`
        
        return (
          <div key={merchant.name} className="space-y-1.5 group">
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-md bg-zinc-900 border border-zinc-850 text-zinc-400 font-bold group-hover:bg-indigo-950 group-hover:border-indigo-900/60 group-hover:text-indigo-400 transition-colors">
                  {index + 1}
                </span>
                <span className="text-zinc-200 truncate max-w-[150px] sm:max-w-[200px]" title={merchant.name}>
                  {merchant.name}
                </span>
              </div>
              <div className="text-right">
                <span className="text-zinc-100">{formatCurrency(merchant.amount, currency)}</span>
                <span className="text-zinc-550 text-[10px] ml-1.5">({merchant.percentage}%)</span>
              </div>
            </div>

            {/* Custom Sleek Progress Bar */}
            <div className="h-1.5 w-full bg-zinc-900/60 rounded-full overflow-hidden border border-zinc-900">
              <div
                className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-600 group-hover:from-indigo-400 group-hover:to-indigo-500 transition-all duration-500"
                style={{ width: barWidth }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
