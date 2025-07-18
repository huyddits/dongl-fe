import { Button } from '@/components/ui/button'
import { Link as LinkIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Header = () => {
  return (
    <header className="">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            className="relative flex h-6 w-[130px] shrink-0 items-center"
            href="/"
          >
            <Image src="/image/logo-big.png" alt="logo" fill />
          </Link>

          {/* Navigation Links */}
          <nav className="hidden items-center space-x-8 md:flex">
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

            {/* Login Button */}
            <Button size="lg">로그인</Button>
          </div>
        </div>
      </div>
    </header>
  )
}
