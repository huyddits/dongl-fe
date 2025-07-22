import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { getCookie, getQueryClient } from '@/lib'
import { GET_USER_PROFILE_QUERY_OPTIONS } from '@/services/auth'
import { TOKEN_KEY } from '@/utils/constants/api'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { PropsWithChildren } from 'react'

export default async function RootLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()
  const token = await getCookie(TOKEN_KEY)
  if (token) await queryClient.prefetchQuery(GET_USER_PROFILE_QUERY_OPTIONS)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      {children}
      <Footer />
    </HydrationBoundary>
  )
}
