'use server'

import { createClient } from '@/lib/supabase/server'

export interface DashboardSummary {
  currency: string
  totalIncome: number
  totalExpense: number
  netBalance: number
  incomeChangePercent: number
  expenseChangePercent: number
  netBalanceChangePercent: number
}

export interface SpendByCategory {
  name: string
  value: number
  color: string
}

export interface DailySpend {
  date: string
  amount: number
  dayName: string
}

export interface TopMerchant {
  name: string
  amount: number
  percentage: number
}

// Helper: Get formatted date strings for UTC/local offsets
function getDateRange() {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  // This month: start & end
  const startOfThisMonth = new Date(year, month, 1)
  const endOfThisMonth = new Date(year, month + 1, 0)
  
  // Last month: start & end
  const startOfLastMonth = new Date(year, month - 1, 1)
  const endOfLastMonth = new Date(year, month, 0)

  // Format helper to adjust local dates to YYYY-MM-DD
  const format = (d: Date) => {
    const y = d.getFullYear()
    const m = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  return {
    thisMonthStart: format(startOfThisMonth),
    thisMonthEnd: format(endOfThisMonth),
    lastMonthStart: format(startOfLastMonth),
    lastMonthEnd: format(endOfLastMonth),
  }
}

export async function getDashboardData(): Promise<{
  summary: DashboardSummary
  spendByCategory: SpendByCategory[]
  dailySpend: DailySpend[]
  topMerchants: TopMerchant[]
}> {
  const supabase = await createClient()
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  if (userError || !user) {
    throw new Error('Unauthorized')
  }

  // Get user profile currency
  const { data: profile } = await supabase
    .from('profiles')
    .select('currency')
    .eq('id', user.id)
    .single()
  const currency = profile?.currency || 'INR'

  const { thisMonthStart, thisMonthEnd, lastMonthStart, lastMonthEnd } = getDateRange()

  // 1. Fetch this month's transactions
  const { data: thisMonthTx, error: thisMonthErr } = await supabase
    .from('transactions')
    .select('amount, type, date, merchant, category:categories(name, color)')
    .eq('user_id', user.id)
    .gte('date', thisMonthStart)
    .lte('date', thisMonthEnd)

  if (thisMonthErr) {
    console.error('Error fetching this month tx:', thisMonthErr)
    throw new Error('Failed to load dashboard data')
  }

  // 2. Fetch last month's transactions
  const { data: lastMonthTx } = await supabase
    .from('transactions')
    .select('amount, type')
    .eq('user_id', user.id)
    .gte('date', lastMonthStart)
    .lte('date', lastMonthEnd)

  const thisMonthData = (thisMonthTx as unknown as {
    amount: number
    type: 'expense' | 'income'
    date: string
    merchant: string | null
    category: { name: string; color: string | null } | null
  }[]) || []
  const lastMonthData = lastMonthTx || []

  // --- Calculate Dashboard Summary Cards ---
  let totalIncomeThisMonth = 0
  let totalExpenseThisMonth = 0

  thisMonthData.forEach((tx) => {
    const amt = Number(tx.amount)
    if (tx.type === 'income') {
      totalIncomeThisMonth += amt
    } else {
      totalExpenseThisMonth += amt
    }
  })

  let totalIncomeLastMonth = 0
  let totalExpenseLastMonth = 0

  lastMonthData.forEach((tx) => {
    const amt = Number(tx.amount)
    if (tx.type === 'income') {
      totalIncomeLastMonth += amt
    } else {
      totalExpenseLastMonth += amt
    }
  })

  const netBalanceThisMonth = totalIncomeThisMonth - totalExpenseThisMonth
  const netBalanceLastMonth = totalIncomeLastMonth - totalExpenseLastMonth

  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) {
      return current > 0 ? 100 : 0
    }
    return Math.round(((current - previous) / previous) * 100)
  }

  const summary: DashboardSummary = {
    currency,
    totalIncome: totalIncomeThisMonth,
    totalExpense: totalExpenseThisMonth,
    netBalance: netBalanceThisMonth,
    incomeChangePercent: calculateChange(totalIncomeThisMonth, totalIncomeLastMonth),
    expenseChangePercent: calculateChange(totalExpenseThisMonth, totalExpenseLastMonth),
    netBalanceChangePercent: calculateChange(netBalanceThisMonth, netBalanceLastMonth),
  }

  // --- Spend By Category Donut ---
  const spendByCategoryMap: Record<string, { value: number; color: string }> = {}
  thisMonthData
    .filter((tx) => tx.type === 'expense')
    .forEach((tx) => {
      const catName = tx.category?.name || 'Other'
      const catColor = tx.category?.color || '#71717a'
      const amt = Number(tx.amount)

      if (!spendByCategoryMap[catName]) {
        spendByCategoryMap[catName] = { value: 0, color: catColor }
      }
      spendByCategoryMap[catName].value += amt
    })

  const spendByCategory: SpendByCategory[] = Object.entries(spendByCategoryMap).map(
    ([name, { value, color }]) => ({
      name,
      value,
      color,
    })
  ).sort((a, b) => b.value - a.value)

  // --- Daily Spend Bar Chart (Last 7 Days) ---
  const dailySpendMap: Record<string, number> = {}
  // Pre-fill daily spend with last 7 days including today
  const formatLocalDate = (d: Date) => {
    const y = d.getFullYear()
    const m = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')
    return `${y}-${m}-${day}`
  }

  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    dailySpendMap[formatLocalDate(d)] = 0
  }

  const sevenDaysAgoStr = Object.keys(dailySpendMap)[0]
  const todayStr = Object.keys(dailySpendMap)[6]

  // Query transactions in the 7-day window
  const { data: dailyTx } = await supabase
    .from('transactions')
    .select('amount, date')
    .eq('user_id', user.id)
    .eq('type', 'expense')
    .gte('date', sevenDaysAgoStr)
    .lte('date', todayStr)

  dailyTx?.forEach((tx) => {
    if (dailySpendMap[tx.date] !== undefined) {
      dailySpendMap[tx.date] += Number(tx.amount)
    }
  })

  const dailySpend: DailySpend[] = Object.entries(dailySpendMap).map(([date, amount]) => {
    const d = new Date(date)
    return {
      date,
      amount,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
    }
  })

  // --- Top 5 Merchants ---
  const merchantMap: Record<string, number> = {}
  thisMonthData
    .filter((tx) => tx.type === 'expense')
    .forEach((tx) => {
      const merchantName = tx.merchant || 'Unknown'
      merchantMap[merchantName] = (merchantMap[merchantName] || 0) + Number(tx.amount)
    })

  const sortedMerchants = Object.entries(merchantMap)
    .map(([name, amount]) => ({ name, amount }))
    .sort((a, b) => b.amount - a.amount)

  const topMerchants: TopMerchant[] = sortedMerchants.slice(0, 5).map((m) => ({
    name: m.name,
    amount: m.amount,
    percentage: totalExpenseThisMonth > 0 ? Math.round((m.amount / totalExpenseThisMonth) * 100) : 0,
  }))

  return {
    summary,
    spendByCategory,
    dailySpend,
    topMerchants,
  }
}
