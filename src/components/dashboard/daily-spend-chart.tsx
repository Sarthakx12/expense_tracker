'use client'

import * as React from 'react'
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { formatCurrency } from '@/lib/currency'

interface DailySpendChartProps {
  data: {
    date: string
    amount: number
    dayName: string
  }[]
  currency: string
}

interface CustomTooltipProps {
  active?: boolean
  payload?: {
    payload: {
      date: string
      amount: number
      dayName: string
    }
  }[]
  currency: string
}

// Custom Tooltip component declared outside of render to prevent recreation
const CustomTooltip = ({ active, payload, currency }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    const item = payload[0].payload
    
    // Format full date nicely: e.g. "16 Jun 2026"
    const dateParts = item.date.split('-')
    const formattedDate = dateParts.length === 3 
      ? new Date(Number(dateParts[0]), Number(dateParts[1]) - 1, Number(dateParts[2])).toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })
      : item.date

    return (
      <div className="bg-zinc-950/90 border border-zinc-800 backdrop-blur-md p-3 rounded-lg shadow-xl shadow-black/80 text-xs space-y-1">
        <div className="font-semibold text-zinc-400">{formattedDate}</div>
        <div className="text-zinc-200">
          Total Spent: <span className="font-bold text-indigo-400">{formatCurrency(item.amount, currency)}</span>
        </div>
      </div>
    )
  }
  return null
}

export function DailySpendChart({ data, currency }: DailySpendChartProps) {
  // Format Y Axis values to compact forms
  const formatYAxis = (value: number) => {
    if (value === 0) return '0'
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`
    }
    return String(value)
  }

  const hasSpend = data.some((d) => d.amount > 0)

  if (!hasSpend) {
    return (
      <div className="flex flex-col items-center justify-center h-[260px] text-zinc-500 italic text-sm">
        No spending recorded over the last 7 days.
      </div>
    )
  }

  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <defs>
            <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6366f1" stopOpacity={0.8} />
              <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.15} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="dayName"
            stroke="#52525b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            dy={8}
          />
          <YAxis
            stroke="#52525b"
            fontSize={11}
            tickLine={false}
            axisLine={false}
            tickFormatter={formatYAxis}
            dx={-4}
          />
          <Tooltip content={<CustomTooltip currency={currency} />} cursor={{ fill: 'rgba(39, 39, 42, 0.2)', radius: 4 }} />
          <Bar
            dataKey="amount"
            fill="url(#barGradient)"
            radius={[4, 4, 0, 0]}
            maxBarSize={32}
            stroke="#6366f1"
            strokeWidth={1}
            animationDuration={800}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
