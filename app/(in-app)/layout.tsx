import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { PropsWithChildren } from 'react'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
