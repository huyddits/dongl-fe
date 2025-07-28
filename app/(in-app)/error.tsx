'use client'

import { Button } from '@/components/ui/button'
import { ROUTES } from '@/utils/constants/routes'
import { AlertTriangle, Home, HomeIcon, RefreshCw } from 'lucide-react'
import Link from 'next/link'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 pt-20 pb-40">
      <div className="w-full max-w-md text-center">
        <AlertTriangle className="mx-auto mb-6 h-16 w-16 text-red-500" />

        <h1 className="mb-4 text-2xl font-bold text-gray-900">
          문제가 발생했어요
        </h1>

        <p className="mb-8 text-gray-600">
          페이지를 불러올 수 없습니다. 다시 시도해 주세요.
        </p>

        {process.env.NODE_ENV === 'development' && error?.message && (
          <div className="mb-8 rounded-lg bg-gray-100 p-4 text-left">
            <p className="mb-2 text-sm font-semibold text-gray-700">Error:</p>
            <pre className="text-error overflow-auto text-xs">
              {error.message}
            </pre>
          </div>
        )}

        <div className="flex flex-col gap-3">
          <Button onClick={reset} size="lg" icon={<HomeIcon />} asChild>
            <Link href={ROUTES.HOME}>홈으로 돌아가기</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
