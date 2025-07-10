import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants'
import Link from 'next/link'

export function Header() {
  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href={ROUTES.HOME} className="text-xl font-bold">
            Dongl Project
          </Link>
          <nav className="hidden items-center space-x-6 md:flex">
            <Link
              href={ROUTES.HOME}
              className="hover:text-primary text-sm font-medium"
            >
              Home
            </Link>
            <Link
              href={ROUTES.ABOUT}
              className="hover:text-primary text-sm font-medium"
            >
              About
            </Link>
            <Link
              href={ROUTES.POSTS}
              className="hover:text-primary text-sm font-medium"
            >
              Posts
            </Link>
            <div className="group relative">
              <button className="hover:text-primary text-sm font-medium">
                Examples
              </button>
              <div className="bg-background invisible absolute top-full left-0 mt-1 w-48 rounded-md border opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                <Link
                  href={ROUTES.SSR_EXAMPLE}
                  className="hover:bg-accent block px-4 py-2 text-sm"
                >
                  SSR Example
                </Link>
                <Link
                  href={ROUTES.SSG_EXAMPLE}
                  className="hover:bg-accent block px-4 py-2 text-sm"
                >
                  SSG Example
                </Link>
                <Link
                  href={ROUTES.CSR_EXAMPLE}
                  className="hover:bg-accent block px-4 py-2 text-sm"
                >
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
