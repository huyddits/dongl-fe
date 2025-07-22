'use client'

import { Button } from '@/components/ui/button'
import { useCookie } from '@/hooks'
import { useAuth } from '@/hooks/useAuth'
import { cn } from '@/lib'
import { useGetUserProfile } from '@/services/auth'
import { TOKEN_KEY } from '@/utils/constants/api'
import { ROUTES } from '@/utils/constants/routes'
import { LinkIcon } from 'lucide-react'
import Link from 'next/link'
import { PropsWithChildren, useEffect, useState } from 'react'

export const HeaderClient = ({ children }: PropsWithChildren) => {
  const [scrolled, setScrolled] = useState(false)
  const token = useCookie<string>(TOKEN_KEY)
  const { data: userProfile } = useGetUserProfile(!!token)
  const { isLoggingOut, onLogout } = useAuth()
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 4)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          `fixed top-0 right-0 left-0 z-50 bg-white transition-all`,
          {
            'shadow-sm': scrolled,
          }
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {children}

            {/* Right Side Actions - Client-side only */}
            <div className="flex items-center space-x-3">
              {/* Points Display */}
              <Button icon={<LinkIcon />} variant="outline" size="lg">
                15,541
              </Button>

              {!userProfile ? (
                <Button size="lg" asChild>
                  <Link href={ROUTES.LOGIN}>로그인</Link>
                </Button>
              ) : (
                <Button size="lg" onClick={onLogout} loading={isLoggingOut}>
                  로그아웃
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className="h-[72px]" />
    </>
  )
}
