import Link from 'next/link'
import { config } from '@/lib/config'

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Dongl Project</h3>
            <p className="text-sm text-muted-foreground">
              {config.app.description}
            </p>
            <p className="text-xs text-muted-foreground">
              Environment: {config.app.env}
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-muted-foreground hover:text-foreground">
                  Posts
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Examples</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/examples/ssr" className="text-muted-foreground hover:text-foreground">
                  SSR Example
                </Link>
              </li>
              <li>
                <Link href="/examples/ssg" className="text-muted-foreground hover:text-foreground">
                  SSG Example
                </Link>
              </li>
              <li>
                <Link href="/examples/csr" className="text-muted-foreground hover:text-foreground">
                  CSR Example
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-muted-foreground hover:text-foreground">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2024 Dongl Project. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}