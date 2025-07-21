'use server'

import { TOKEN_KEY } from '@/utils/constants/api'
import { ROUTES } from '@/utils/constants/routes'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const saveTokenAndNavigateHome = async (value: string) => {
  const cookie = await cookies()
  cookie.set(TOKEN_KEY, value, {
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: '/',
    sameSite: 'lax',
    secure: true,
  })
  redirect(ROUTES.HOME)
}

export const deleteTokenAndNavigateLogin = async () => {
  const cookie = await cookies()
  cookie.delete(TOKEN_KEY)
  redirect(ROUTES.LOGIN)
}
