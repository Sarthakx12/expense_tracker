import { createClient } from '@/lib/supabase/server'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Wallet, ArrowUpRight, ArrowDownRight, Target } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const firstName = user?.user_metadata?.full_name?.split(' ')[0] || 'User'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-zinc-100">Welcome back, {firstName}</h1>
        <p className="text-zinc-400 mt-1">Here's what's happening with your finances today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Balance */}
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-zinc-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">₹0.00</div>
            <p className="text-xs text-zinc-500 mt-1">+0% from last month</p>
          </CardContent>
        </Card>

        {/* Income */}
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Income</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">₹0.00</div>
            <p className="text-xs text-zinc-500 mt-1">+0% from last month</p>
          </CardContent>
        </Card>

        {/* Expenses */}
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Expenses</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">₹0.00</div>
            <p className="text-xs text-zinc-500 mt-1">+0% from last month</p>
          </CardContent>
        </Card>

        {/* Active Goals */}
        <Card className="bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-zinc-400">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-indigo-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-zinc-100">0</div>
            <p className="text-xs text-zinc-500 mt-1">0 completed this year</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-8">
        <Card className="col-span-4 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-zinc-100">Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t border-zinc-800/50">
            <p className="text-sm text-zinc-500">No data available to display chart.</p>
          </CardContent>
        </Card>
        
        <Card className="col-span-3 bg-zinc-900/50 border-zinc-800 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-zinc-100">Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center h-[300px] border-t border-zinc-800/50">
            <ArrowLeftRight className="h-10 w-10 text-zinc-600 mb-3" />
            <p className="text-sm text-zinc-400">No recent transactions found.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
