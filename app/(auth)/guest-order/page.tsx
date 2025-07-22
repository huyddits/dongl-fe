import React from 'react'
import { GuestOrderForm } from './_components'

export default function GuestOrderPage() {
  return (
    <div>
      <h1 className="text-h1 my-6 mb-8 text-center font-semibold">
        비회원 주문 조회
      </h1>
      <div className="rounded-2xl bg-white p-6 md:p-10">
        <h2 className="text-h3 mb-6 text-center font-semibold">
          주문조회를 하시겠어요?
        </h2>
        <GuestOrderForm />
      </div>
    </div>
  )
}
