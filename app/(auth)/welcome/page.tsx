'use client'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/utils/constants/routes'
import Image from 'next/image'
import Link from 'next/link'

export default function WelcomePage() {
  return (
    <div>
      <h1 className="text-h1 my-6 mb-8 text-center font-semibold">
        환영합니다
      </h1>
      <div className="rounded-2xl bg-white p-6 md:p-10">
        <h2 className="text-h3 mb-6 text-center font-semibold">
          이제 소중한 사람들에게 편지를 적어볼까요?
        </h2>

        <div className="space-y-6">
          <Button asChild className="w-full" color="secondary" size="lg">
            <Link href={ROUTES.LOGIN}>로그인</Link>
          </Button>

          <Button className="w-full" size="lg">
            비회원 편지쓰기
          </Button>

          <Button variant="outline" className="w-full" size="lg" asChild>
            <Link href={ROUTES.GUEST_ORDER}>마이페이지 / 비회원 주문 조회</Link>
          </Button>
          <div className="flex gap-4">
            <Button variant="outline" className="h-16 flex-1">
              <Image
                src="/image/google-play.svg"
                alt="Google Play"
                width={180}
                height={36}
              />
            </Button>
            <Button variant="outline" className="h-16 flex-1">
              <Image
                src="/image/apple-store.svg"
                alt="Apple Store"
                width={110}
                height={36}
              />
            </Button>
          </div>

          <div className="text-center">
            <Link
              href="#"
              className="text-medium text-primary link-underline font-semibold"
            >
              동물 정보 자세히보기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
