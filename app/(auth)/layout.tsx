import Image from 'next/image'
import React from 'react'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative h-dvh w-dvw flex-col items-center overflow-hidden">
      <div className="size-full overflow-auto">
        <div className="flex flex-col items-center">
          <Image
            src="/image/logo-big.png"
            alt="logo"
            width={260}
            height={48}
            className="text-h1 mt-10"
          />
          <div className="z-10 container max-w-xl">{children}</div>
        </div>
      </div>
      <div
        style={{ background: 'hsla(42, 72%, 52%, 1)' }}
        className="absolute bottom-3/4 aspect-square w-1/2 min-w-[900px] rounded-full blur-[800px]"
      />
      <div
        style={{ background: 'hsla(230, 87%, 61%, 1)' }}
        className="absolute top-3/4 right-0 aspect-square w-1/2 min-w-[900px] rounded-full blur-[800px]"
      />
    </div>
  )
}
