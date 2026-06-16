'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: 'dashboard' },
  { name: 'Transactions', href: '/transactions', icon: 'swap_horiz' },
  { name: 'Assistant', href: '/assistant', icon: 'smart_toy' },
  { name: 'Budgets', href: '/budgets', icon: 'account_balance_wallet' },
  { name: 'Goals', href: '/goals', icon: 'track_changes' },
]

export function Sidebar({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("hidden lg:flex flex-col h-screen w-64 fixed left-0 top-0 z-50 bg-surface-container-low/90 backdrop-blur-xl border-r border-outline-variant/30 shadow-[10px_0_30px_rgba(0,0,0,0.03)] py-lg gap-sm", className)}>
      <div className="px-lg mb-8">
        <Link href="/dashboard" className="block transition-opacity hover:opacity-80">
          <h1 className="font-headline-md text-headline-md font-extrabold bg-gradient-to-tr from-primary to-tertiary bg-clip-text text-transparent">PaisaIQ</h1>
          <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">Premium Tier</p>
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col gap-unit overflow-y-auto px-4">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href)
          
          if (isActive) {
            return (
              <Link
                key={item.name}
                href={item.href}
                className="bg-primary text-on-primary shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.1),inset_2px_2px_4px_rgba(255,255,255,0.2)] rounded-xl mx-2 my-1 px-4 py-3 flex items-center gap-3 transition-all duration-300"
              >
                <span className="material-symbols-outlined icon-fill">{item.icon}</span>
                <span className="font-label-sm text-label-sm">{item.name}</span>
              </Link>
            )
          }

          return (
            <Link
              key={item.name}
              href={item.href}
              className="text-on-surface-variant hover:text-primary mx-2 my-1 px-4 py-3 hover:bg-surface-container-high rounded-xl group hover:translate-x-1 transition-all duration-300 flex items-center gap-3"
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span className="font-label-sm text-label-sm">{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
