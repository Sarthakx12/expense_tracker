export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-50 selection:bg-indigo-500/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-zinc-950" />
      <div className="relative z-10 w-full max-w-md p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
            Expense Tracker
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            Manage your finances with ease
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
