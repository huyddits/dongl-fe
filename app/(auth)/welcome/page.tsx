'use client'

import { Button } from '@/components/ui/button'
import { Apple, Play } from 'lucide-react'
import Link from 'next/link'

export default function WelcomePage() {
  return (
    <div className="mx-auto mt-20 w-full max-w-md rounded-lg border bg-white p-8 text-center shadow-lg">
      <h1 className="mb-8 text-lg font-semibold">
        이제 소중한 사람들에게 편지를 적어볼까요?
      </h1>

      <Button className="mb-3 h-12 w-full bg-yellow-400 font-semibold text-black hover:bg-yellow-300">
        로그인
      </Button>

      <Button className="mb-3 h-12 w-full bg-indigo-400 font-semibold text-white hover:bg-indigo-500">
        비회원 편지쓰기
      </Button>

      <Button
        variant="outline"
        className="mb-6 h-12 w-full border border-indigo-300 font-semibold text-indigo-500 hover:bg-indigo-50"
      >
        마이페이지 / 비회원 주문 조회
      </Button>

      <div className="mb-6 flex justify-center gap-4">
        <a
          href="#"
          className="flex w-36 items-center justify-center gap-2 rounded border px-4 py-2 text-sm font-medium shadow"
        >
          <Play className="h-5 w-5" />
          Google Play
        </a>
        <a
          href="#"
          className="flex w-36 items-center justify-center gap-2 rounded border px-4 py-2 text-sm font-medium shadow"
        >
          <Apple className="h-5 w-5" />
          Apple
        </a>
      </div>

      <Link href="#" className="text-sm font-semibold text-indigo-500">
        동물 정보 자세히보기
      </Link>
    </div>
  )
}
