import { ROUTES } from '@/utils/constants/routes'
import Link from 'next/link'
import React from 'react'
import SignupForm from './_components/SignupForm'

export default function SignupPage() {
  return (
    <div>
      <h1 className="text-h1 my-6 mb-8 text-center font-semibold">회원가입</h1>
      <div className="rounded-2xl bg-white p-6 md:p-10">
        <h2 className="text-h3 mb-6 text-center font-semibold">
          계정을 만들어 주세요
        </h2>
        <SignupForm />
        <div className="mt-4 space-y-2">
          <p className="text-medium text-grey-200 text-center">
            이미 계정이 있으신가요?&nbsp;
            <Link
              href={ROUTES.FORGOT_PASSWORD}
              className="text-primary link-underline font-semibold"
            >
              비밀번호 찾기
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
