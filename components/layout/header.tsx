'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib'
import { ROUTES } from '@/utils/constants/routes'
import { LinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MobileNavLinks } from './mobile-nav-links'

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)

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
          { 'shadow-sm': scrolled }
        )}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Nav Sheet Trigger */}
            <div className="flex items-center gap-4">
              <MobileNavLinks />

              <Link
                className="relative flex h-6 w-[130px] shrink-0 items-center"
                href={ROUTES.HOME}
              >
                <Image src="/image/logo-big.png" alt="logo" fill priority />
              </Link>
            </div>
            {/* Desktop Navigation Links */}
            <nav className="hidden items-center space-x-8 lg:flex">
              <Link
                href="/"
                className="link-underline text-text-secondary hover:text-text-primary px-3 py-2 hover:font-bold"
              >
                Home
              </Link>
              <Link
                href="/my-letter"
                className="link-underline text-text-secondary hover:text-text-primary px-3 py-2 hover:font-bold"
              >
                My Letter
              </Link>
              <Link
                href="/my-page"
                className="link-underline text-text-secondary hover:text-text-primary px-3 py-2 hover:font-bold"
              >
                My Page
              </Link>
              <Link
                href="/services"
                className="link-underline text-text-secondary hover:text-text-primary px-3 py-2 hover:font-bold"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="link-underline text-text-secondary hover:text-text-primary px-3 py-2 hover:font-bold"
              >
                Contact
              </Link>
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Points Display */}
              <Button icon={<LinkIcon />} variant="outline" size="lg">
                15,541
              </Button>

              <Button size="lg" asChild>
                <Link href={ROUTES.LOGIN}>로그인</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      <div className="h-[72px]" />
    </>
  )
}
