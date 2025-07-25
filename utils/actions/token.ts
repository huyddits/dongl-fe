'use server'

import { REFRESH_TOKEN_KEY, TOKEN_KEY } from '@/utils/constants/api'
import { ROUTES } from '@/utils/constants/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const saveTokenAndNavigateHome = async (
  accessToken: string,
  refreshToken: string
) => {
  const cookie = await cookies()
  cookie.set(TOKEN_KEY, accessToken, {
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: '/',
    sameSite: 'lax',
  })
  cookie.set(REFRESH_TOKEN_KEY, refreshToken, {
    maxAge: 60 * 60 * 24 * 7, // 30 days in seconds
    path: '/',
    sameSite: 'lax',
  })

  redirect(ROUTES.HOME)
}

export const deleteTokenAndNavigateLogin = async () => {
  const cookie = await cookies()
  cookie.delete(TOKEN_KEY)
  cookie.delete(REFRESH_TOKEN_KEY)
  redirect(ROUTES.LOGIN)
}
