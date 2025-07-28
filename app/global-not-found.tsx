'use client'

import { ROUTES } from '@/utils/constants/routes'
import { redirect } from 'next/navigation'

export default function GlobalNotFound() {
  return redirect(ROUTES.HOME)
}
