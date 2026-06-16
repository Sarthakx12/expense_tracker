import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Sidebar } from '@/components/app-shell/sidebar'
import { Topbar } from '@/components/app-shell/topbar'

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  // Ensure user is authenticated
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const user = data.user
  const userFullName = user.user_metadata?.full_name as string | undefined

  return (
    <div className="flex h-screen overflow-hidden bg-background text-on-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden lg:ml-64">
        {/* Topbar with Mobile Menu & User Profile */}
        <Topbar userEmail={user.email} userFullName={userFullName} />

        {/* Main Content Area */}
        <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none scroll-smooth">
          <div className="mx-auto max-w-container-max w-full p-margin-mobile md:p-gutter">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
