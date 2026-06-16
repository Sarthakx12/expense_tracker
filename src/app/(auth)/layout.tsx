export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-on-background selection:bg-primary/30">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="relative z-10 w-full max-w-[448px] p-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-tr from-primary to-tertiary bg-clip-text text-transparent font-headline-md">
            PaisaIQ
          </h1>
          <p className="text-on-surface-variant mt-2 text-body-md font-body-md">
            Manage your finances with intelligence
          </p>
        </div>
        {children}
      </div>
    </div>
  )
}
