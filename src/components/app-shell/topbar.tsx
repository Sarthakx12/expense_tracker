'use client'

import { UserMenu } from './user-menu'
import { Sidebar } from './sidebar'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface TopbarProps {
  userEmail?: string
  userFullName?: string
}

export function Topbar({ userEmail, userFullName }: TopbarProps) {
  return (
    <header className="lg:hidden sticky top-0 z-40 w-full h-16 bg-surface/80 backdrop-blur-md flex justify-between items-center px-lg shadow-[4px_4px_10px_rgba(0,0,0,0.05),-4px_-4px_10px_rgba(255,255,255,0.8)]">
      <div className="flex items-center gap-2">
        <Sheet>
          <SheetTrigger
            render={
              <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full active:scale-95 transition-all lg:hidden" />
            }
          >
            <span className="sr-only">Open sidebar</span>
            <span className="material-symbols-outlined" aria-hidden="true">menu</span>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-background border-outline-variant/30 w-72">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            <Sidebar className="w-full relative flex h-full shadow-none border-none" />
          </SheetContent>
        </Sheet>
        <Link href="/dashboard" className="lg:hidden">
          <h1 className="font-headline-md text-headline-md font-bold text-primary">PaisaIQ</h1>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-on-surface-variant hover:bg-surface-container-low p-2 rounded-full active:scale-95 transition-all">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <UserMenu email={userEmail} fullName={userFullName} />
      </div>
    </header>
  )
}
