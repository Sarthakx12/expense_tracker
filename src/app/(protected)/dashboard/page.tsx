import { createClient } from '@/lib/supabase/server'
import { getDashboardData } from '@/app/(protected)/dashboard/actions'
import { SummaryCards } from '@/components/dashboard/summary-cards'
import { CategoryDonutChart } from '@/components/dashboard/category-donut-chart'
import { DailySpendChart } from '@/components/dashboard/daily-spend-chart'
import { TopMerchants } from '@/components/dashboard/top-merchants'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BarChart3, PieChart, Store } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'User'

  // Fetch all dashboard data server-side
  const dashboardData = await getDashboardData()

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100 bg-gradient-to-r from-zinc-50 to-zinc-400 bg-clip-text text-transparent">
          Welcome back, {firstName}
        </h1>
        <p className="text-zinc-450 mt-1 text-sm">
          Here&apos;s a live overview of your manual tracks and financial statistics.
        </p>
      </div>

      {/* Summary Cards */}
      <SummaryCards
        currency={dashboardData.summary.currency}
        totalIncome={dashboardData.summary.totalIncome}
        totalExpense={dashboardData.summary.totalExpense}
        netBalance={dashboardData.summary.netBalance}
        incomeChangePercent={dashboardData.summary.incomeChangePercent}
        expenseChangePercent={dashboardData.summary.expenseChangePercent}
        netBalanceChangePercent={dashboardData.summary.netBalanceChangePercent}
      />

      {/* Charts & Merchants Grid */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        
        {/* Daily Spend Bar Chart */}
        <Card className="lg:col-span-4 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-4.5 w-4.5 text-indigo-400" />
              <CardTitle className="text-zinc-100">Daily Spending Trend</CardTitle>
            </div>
            <CardDescription className="text-zinc-500 text-xs mt-0.5">
              Your daily expense amounts over the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-6">
            <DailySpendChart
              data={dashboardData.dailySpend}
              currency={dashboardData.summary.currency}
            />
          </CardContent>
        </Card>

        {/* Spend by Category Donut Chart */}
        <Card className="lg:col-span-3 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm flex flex-col justify-between">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <PieChart className="h-4.5 w-4.5 text-indigo-400" />
              <CardTitle className="text-zinc-100">Spend by Category</CardTitle>
            </div>
            <CardDescription className="text-zinc-500 text-xs mt-0.5">
              Expense distribution across your active categories this month.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-6">
            <CategoryDonutChart
              data={dashboardData.spendByCategory}
              currency={dashboardData.summary.currency}
            />
          </CardContent>
        </Card>

        {/* Top 5 Merchants List */}
        <Card className="lg:col-span-7 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-2">
              <Store className="h-4.5 w-4.5 text-indigo-400" />
              <CardTitle className="text-zinc-100">Top 5 Merchants</CardTitle>
            </div>
            <CardDescription className="text-zinc-500 text-xs mt-0.5">
              Your highest expenditure outlets for this month.
            </CardDescription>
          </CardHeader>
          <CardContent className="pb-6">
            <TopMerchants
              merchants={dashboardData.topMerchants}
              currency={dashboardData.summary.currency}
            />
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
