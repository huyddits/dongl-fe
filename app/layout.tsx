import { MainLayout } from '@/components/layout/main-layout'
import { Toaster } from '@/components/ui/sonner'
import { config } from '@/lib/config'
import { ReactQueryProvider } from '@/providers'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: config.app.name,
    template: `%s | ${config.app.name}`,
  },
  description: config.app.description,
  keywords: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
  authors: [{ name: 'Your Company' }],
  creator: 'Your Company',
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: config.app.url,
    title: config.app.name,
    description: config.app.description,
    siteName: config.app.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: config.app.name,
    description: config.app.description,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" suppressHydrationWarning className="light">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Toaster />
          <MainLayout>{children}</MainLayout>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
