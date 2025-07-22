import { ROUTES } from '@/utils/constants/routes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { HeaderClient } from './header-client'
import { MobileNavLinks } from './mobile-nav-links'

export const Header = () => {
  return (
    <HeaderClient>
      <div className="flex items-center gap-4">
        <MobileNavLinks />

        <Link
          className="relative flex h-6 w-[130px] shrink-0 items-center"
          href={ROUTES.HOME}
        >
          <Image src="/image/logo-big.png" alt="logo" fill priority />
        </Link>
      </div>

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
    </HeaderClient>
  )
}
