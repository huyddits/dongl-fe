import { ROUTES } from '@/utils/constants/routes'
import Link from 'next/link'
import React from 'react'
import { ForgotPasswordForm } from './_components'

export default function ForgotPasswordPage() {
  return (
    <div>
      <h1 className="text-h1 my-6 mb-8 text-center font-semibold">
        비밀번호 찾기
      </h1>
      <div className="rounded-2xl bg-white p-6 md:p-10">
        <h2 className="text-h3 mb-6 text-center font-semibold">
          본인을 인증해주세요
        </h2>
        <ForgotPasswordForm />
        <div className="mt-6">
          <p className="text-medium text-grey-200 text-center">
            이미 계정이 있으신가요?&nbsp;
            <Link
              href={ROUTES.LOGIN}
              className="text-primary link-underline font-semibold"
            >
              로그인 하기
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
