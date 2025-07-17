'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const TOKEN_KEY = 'token'

export const saveToken = async (value: string) => {
  const cookie = await cookies()
  cookie.set(TOKEN_KEY, value, {
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: '/',
    sameSite: 'lax',
    secure: true,
  })
  redirect('/')
}

export const deleteToken = async () => {
  const cookie = await cookies()
  cookie.delete(TOKEN_KEY)
  redirect('/login')
}
