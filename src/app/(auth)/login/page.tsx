import Link from 'next/link'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>
}) {
  const { message } = await searchParams

  const signIn = async (formData: FormData) => {
    'use server'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const supabase = await createClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return redirect('/login?message=Could not authenticate user')
    }
    return redirect('/dashboard')
  }

  const signInWithGoogle = async () => {
    'use server'
    const supabase = await createClient()
    const headersList = await headers()
    const origin = headersList.get('origin')

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${origin}/auth/callback`,
      },
    })

    if (data.url) {
      redirect(data.url)
    }
  }

  return (
    <Card className="border-none bg-surface/90 backdrop-blur-xl clay-raised rounded-3xl overflow-hidden">
      <CardHeader className="space-y-1 pb-6 pt-8">
        <CardTitle className="text-2xl font-headline-md font-semibold tracking-tight text-on-surface">Sign in</CardTitle>
        <CardDescription className="text-on-surface-variant font-body-md">
          Enter your email and password to access your account
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={signInWithGoogle}>
          <Button variant="outline" className="w-full bg-surface clay-sunken text-on-surface hover:bg-surface-container border-none h-12 rounded-xl font-label-sm" type="submit">
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Sign in with Google
          </Button>
        </form>
        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full border-outline-variant/30 bg-outline-variant/30" />
          </div>
          <div className="relative flex justify-center text-xs uppercase font-label-sm">
            <span className="bg-surface px-2 text-on-surface-variant">Or continue with</span>
          </div>
        </div>
        <form action={signIn} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-on-surface font-label-sm">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              required
              className="bg-surface-container clay-sunken border-none text-on-surface placeholder:text-outline-variant focus-visible:ring-primary h-12 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-on-surface font-label-sm">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              required
              className="bg-surface-container clay-sunken border-none text-on-surface placeholder:text-outline-variant focus-visible:ring-primary h-12 rounded-xl"
            />
          </div>
          {message && (
            <p className="text-sm font-medium text-error mt-2 p-3 bg-error-container/30 rounded-xl border border-error/20 font-label-sm">
              {message}
            </p>
          )}
          <Button className="w-full clay-button-primary hover:opacity-90 transition-opacity border-none h-12 rounded-xl font-label-sm mt-4" type="submit">
            Sign In
          </Button>
        </form>
      </CardContent>
      <CardFooter className="pb-8">
        <p className="text-sm text-center text-on-surface-variant w-full font-body-md">
          Don't have an account?{' '}
          <Link href="/signup" className="text-primary hover:text-primary-container font-semibold transition-colors">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
