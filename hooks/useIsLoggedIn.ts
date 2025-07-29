'use client'

import { TOKEN_KEY } from '@/utils/constants/api'
import useCookie from './useCookie'

export const useIsLoggedIn = () => {
  const token = useCookie(TOKEN_KEY)
  return !!token
}
