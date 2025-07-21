import { getServerCookie } from '@/utils/actions/cookies'
import { clsx, type ClassValue } from 'clsx'
import Cookies from 'js-cookie'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isServer(): boolean {
  return typeof window === 'undefined'
}

export async function getCookie(key: string) {
  if (isServer()) {
    return getServerCookie(key)
  }
  return Cookies.get(key)
}
