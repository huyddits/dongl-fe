import { Toaster } from '@/components/ui/sonner'
import { config } from '@/lib/config'
import { ReactQueryProvider } from '@/providers/react-query'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PropsWithChildren } from 'react'
import './globals.css'

const inter = Inter({ subsets: ['latin', 'latin-ext'], display: 'swap' })

export const metadata: Metadata = {
  title: {
    default: config.app.name,
    template: `%s | ${config.app.name}`,
  },
  description: config.app.description,
  keywords: ['Next.js', 'Writing Letter'],
  authors: [{ name: 'IceTea Software' }],
  creator: 'IceTea Software',
  icons: {
    icon: '/icon.ico',
    shortcut: '/icon.ico',
    apple: '/icon.ico',
  },
  openGraph: {
    type: 'website',
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

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="vi" suppressHydrationWarning className="light">
      <body className={inter.className}>
        <ReactQueryProvider>
          <Toaster />
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}
