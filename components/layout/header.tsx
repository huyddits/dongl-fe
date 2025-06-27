import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href={ROUTES.HOME} className="text-xl font-bold">
            Dongl Project
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href={ROUTES.HOME} className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link href={ROUTES.ABOUT} className="text-sm font-medium hover:text-primary">
              About
            </Link>
            <Link href={ROUTES.POSTS} className="text-sm font-medium hover:text-primary">
              Posts
            </Link>
            <div className="relative group">
              <button className="text-sm font-medium hover:text-primary">
                Examples
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-background border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link href={ROUTES.SSR_EXAMPLE} className="block px-4 py-2 text-sm hover:bg-accent">
                  SSR Example
                </Link>
                <Link href={ROUTES.SSG_EXAMPLE} className="block px-4 py-2 text-sm hover:bg-accent">
                  SSG Example
                </Link>
                <Link href={ROUTES.CSR_EXAMPLE} className="block px-4 py-2 text-sm hover:bg-accent">
                  CSR Example
                </Link>
              </div>
            </div>
          </nav>
        </div>
        <Button variant="outline" size="sm">
          Login
        </Button>
      </div>
    </header>
  )
}