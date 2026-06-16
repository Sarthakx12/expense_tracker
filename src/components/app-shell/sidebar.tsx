'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, 
  ArrowLeftRight, 
  Bot, 
  Wallet, 
  Target, 
  Settings,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: ArrowLeftRight },
  { name: 'Assistant', href: '/assistant', icon: Bot },
  { name: 'Budgets', href: '/budgets', icon: Wallet },
  { name: 'Goals', href: '/goals', icon: Target },
]

const bottomNav = [
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <div className={cn("flex flex-col h-full bg-zinc-950 border-r border-zinc-800 text-zinc-300 w-64", className)}>
      <div className="flex h-16 shrink-0 items-center px-6">
        <Link href="/dashboard" className="flex items-center gap-2 transition-opacity hover:opacity-80">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Wallet className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-zinc-100 to-zinc-400 bg-clip-text text-transparent tracking-tight">
            Finance App
          </span>
        </Link>
      </div>
      <div className="flex flex-col flex-1 px-3 py-6 overflow-y-auto">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname.startsWith(item.href)
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? 'bg-zinc-900 text-indigo-400'
                    : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100',
                  'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors'
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300',
                    'mr-3 h-5 w-5 flex-shrink-0 transition-colors'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            )
          })}
        </nav>
        
        <div className="mt-8 pt-6 border-t border-zinc-800/50">
          <nav className="space-y-1">
            {bottomNav.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    isActive
                      ? 'bg-zinc-900 text-indigo-400'
                      : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-zinc-100',
                    'group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors'
                  )}
                >
                  <item.icon
                    className={cn(
                      isActive ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-300',
                      'mr-3 h-5 w-5 flex-shrink-0 transition-colors'
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
