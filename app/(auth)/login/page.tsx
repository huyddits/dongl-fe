import { ROUTES } from '@/utils/constants/routes'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { LoginForm } from './_components'

export default function LoginPage() {
  return (
    <div>
      <h1 className="text-h1 my-6 mb-8 text-center font-semibold">회원가입</h1>
      <div className="rounded-2xl bg-white p-6 md:p-10">
        <h2 className="text-h3 mb-6 text-center font-semibold">
          로그인 해주세요
        </h2>
        <LoginForm />
        <div className="mb-6 flex justify-center gap-3">
          <Image
            src="/image/kakao.svg"
            alt="kakao"
            width={60}
            height={60}
            className="cursor-pointer rounded-lg bg-[#FFEB3B]"
          />
          <Image
            src="/image/naver.svg"
            alt="kakao"
            width={60}
            height={60}
            className="cursor-pointer rounded-lg bg-[#2DB400]"
          />
          <Image
            src="/image/apple.svg"
            alt="kakao"
            width={60}
            height={60}
            className="cursor-pointer rounded-lg bg-black"
          />
        </div>
        <div className="space-y-2">
          <p className="text-medium text-grey-200 text-center">
            계정이 없으신가요?&nbsp;
            <Link
              href={ROUTES.SIGNUP}
              className="text-primary link-underline font-semibold"
            >
              회원가입 하기
            </Link>
          </p>
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
