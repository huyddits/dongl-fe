import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ROUTES } from '@/utils/constants/routes'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export function MobileNavLinks() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" icon={<MenuIcon />} />
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>
              <Link
                href={ROUTES.HOME}
                className="relative mt-1 flex h-6 w-[130px] items-center"
              >
                <Image src="/image/logo-big.png" alt="logo" fill priority />
              </Link>
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col">
            <nav className="flex flex-col gap-2 px-4 py-6">
              <Link
                href="/"
                className="link-underline text-text-secondary hover:text-text-primary rounded px-3 py-2"
              >
                Home
              </Link>
              <Link
                href="/my-letter"
                className="link-underline text-text-secondary hover:text-text-primary rounded px-3 py-2"
              >
                My Letter
              </Link>
              <Link
                href="/my-page"
                className="link-underline text-text-secondary hover:text-text-primary rounded px-3 py-2"
              >
                My Page
              </Link>
              <Link
                href="/services"
                className="link-underline text-text-secondary hover:text-text-primary rounded px-3 py-2"
              >
                Services
              </Link>
              <Link
                href="/contact"
                className="link-underline text-text-secondary hover:text-text-primary rounded px-3 py-2"
              >
                Contact
              </Link>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
