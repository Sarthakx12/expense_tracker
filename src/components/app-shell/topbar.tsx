'use client'

import { UserMenu } from './user-menu'
import { Sidebar } from './sidebar'
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

interface TopbarProps {
  userEmail?: string
  userFullName?: string
}

export function Topbar({ userEmail, userFullName }: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-x-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md px-4 sm:gap-x-6 sm:px-6 lg:px-8">
      {/* Mobile Menu Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900">
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 bg-zinc-950 border-zinc-800 w-72">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <Sidebar className="w-full border-r-0" />
        </SheetContent>
      </Sheet>

      <div className="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          {/* User profile dropdown */}
          <UserMenu email={userEmail} fullName={userFullName} />
        </div>
      </div>
    </header>
  )
}
