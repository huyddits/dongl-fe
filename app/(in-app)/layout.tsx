import { Footer } from '@/components/layout/footer'
import { Header } from '@/components/layout/header'
import { getCookie, getQueryClient } from '@/lib'
import { GET_USER_PROFILE_QUERY_OPTIONS } from '@/services/auth'
import { TOKEN_KEY } from '@/utils/constants/api'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import React, { PropsWithChildren } from 'react'

export default async function RootLayout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient()
  const token = await getCookie(TOKEN_KEY)
  if (token) await queryClient.prefetchQuery(GET_USER_PROFILE_QUERY_OPTIONS)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <div className="relative bg-blue-50/50 pt-36">
        <div
          style={{ background: 'hsla(42, 72%, 52%, 1)' }}
          className="pointer-events-none absolute top-[230px] right-[23%] z-0 aspect-square size-44 rounded-full blur-[100px]"
        />
        <div
          style={{ background: 'hsla(42, 72%, 52%, 1)' }}
          className="pointer-events-none absolute top-[270px] right-[7%] z-0 aspect-square size-44 rounded-full blur-[100px]"
        />
        <div
          style={{ background: 'hsla(230, 87%, 61%, 1)' }}
          className="pointer-events-none absolute top-[600px] -left-10 z-0 aspect-square size-52 rounded-full blur-[100px]"
        />
        <div className="relative z-[2]">{children}</div>
      </div>
      <Footer />
    </HydrationBoundary>
  )
}
