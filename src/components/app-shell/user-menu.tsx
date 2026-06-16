'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export function UserMenu({ email, fullName }: { email: string | undefined, fullName: string | undefined }) {
  const router = useRouter()
  const supabase = createClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const initials = fullName ? fullName.split(' ').map(n => n[0]).join('').toUpperCase() : (email?.substring(0, 2).toUpperCase() || 'U')

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <button className="outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full relative" />
        }
      >
        <Avatar className="h-9 w-9 border border-outline-variant/50 transition-opacity hover:opacity-80 shadow-sm">
          <AvatarImage src="" alt={fullName || email || "User Avatar"} />
          <AvatarFallback className="bg-primary-container text-on-primary-container font-medium text-xs">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 clay-raised border-outline-variant/30 text-on-surface rounded-xl mt-2">
        <DropdownMenuLabel className="font-normal px-4 py-3">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none text-on-surface">{fullName || 'User'}</p>
            <p className="text-xs leading-none text-on-surface-variant mt-1">{email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-outline-variant/30" />
        <DropdownMenuItem className="focus:bg-surface-container-high focus:text-primary cursor-pointer px-4 py-3 mx-1 my-1 rounded-lg">
          <span className="material-symbols-outlined mr-2 text-[20px]">person</span>
          <span className="font-label-sm text-label-sm">Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-surface-container-high focus:text-primary cursor-pointer px-4 py-3 mx-1 my-1 rounded-lg">
          <span className="material-symbols-outlined mr-2 text-[20px]">settings</span>
          <span className="font-label-sm text-label-sm">Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-outline-variant/30" />
        <DropdownMenuItem 
          onClick={handleSignOut}
          className="text-error focus:bg-error-container/50 focus:text-error cursor-pointer px-4 py-3 mx-1 my-1 rounded-lg"
        >
          <span className="material-symbols-outlined mr-2 text-[20px]">logout</span>
          <span className="font-label-sm text-label-sm">Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
