'use client'

import * as React from 'react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { formatCurrency } from '@/lib/currency'

interface CategoryDonutChartProps {
  data: {
    name: string
    value: number
    color: string
  }[]
  currency: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: {
    payload: {
      name: string
      value: number
      color: string
    }
  }[]
  currency: string
  total: number
}

// Custom Tooltip component declared outside of render to prevent recreation
const CustomTooltip = ({ active, payload, currency, total }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    return (
      <div className="bg-zinc-950/90 border border-zinc-800 backdrop-blur-md p-3 rounded-lg shadow-xl shadow-black/80 text-xs space-y-1">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          <span className="font-semibold text-zinc-200">{item.name}</span>
        </div>
        <div className="text-zinc-400">
          Amount: <span className="font-bold text-zinc-100">{formatCurrency(item.value, currency)}</span>
        </div>
        {total > 0 && (
          <div className="text-zinc-500 text-[10px]">
            Percentage: <span className="font-semibold text-zinc-350">{Math.round((item.value / total) * 100)}%</span>
          </div>
        )}
      </div>
    )
  }
  return null
}

export function CategoryDonutChart({ data, currency }: CategoryDonutChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[260px] text-zinc-500 italic text-sm">
        No expense data available for this month.
      </div>
    )
  }

  return (
    <div className="relative w-full h-[260px]">
      {/* Center Label (Total Expenses) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">Total Spent</span>
        <span className="text-xl font-extrabold text-zinc-100 mt-0.5">{formatCurrency(total, currency)}</span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={3}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="#09090b" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip currency={currency} total={total} />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Categories Legend List */}
      <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 mt-2 max-h-[70px] overflow-y-auto px-4">
        {data.slice(0, 6).map((item, index) => (
          <div key={index} className="flex items-center gap-1.5 text-xs">
            <span className="h-2 w-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
            <span className="text-zinc-400 font-medium truncate max-w-[80px]">{item.name}</span>
            <span className="text-zinc-500 text-[10px] font-semibold">{Math.round((item.value / total) * 100)}%</span>
          </div>
        ))}
        {data.length > 6 && (
          <div className="text-[10px] text-zinc-500 italic font-semibold">
            +{data.length - 6} more categories
          </div>
        )}
      </div>
    </div>
  )
}
