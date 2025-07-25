'use server'

import { cookies } from 'next/headers'

export const getServerCookie = async (key: string) => {
  const cookie = await cookies()
  return cookie.get(key)?.value
}
