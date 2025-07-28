'use client'

import { MailStackIcon, SearchLocationIcon } from '@/components/svg'
import { Button } from '@/components/ui/button'
import { Tag } from '@/components/ui/tag'
import { ROUTES } from '@/utils/constants/routes'
import { Heart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const testimonials = [
  {
    id: 1,
    name: '김하늘',
    location: '서울특별시 마포구',
    content:
      '정말 감동적인 서비스예요. 편지를 보내는 일이 이렇게 간단하고 감성적일 줄 몰랐어요.',
    avatar: '/image/avatar.svg',
    rating: 5,
  },
  {
    id: 2,
    name: '김하늘',
    location: '서울특별시 마포구',
    content: '디자인이 너무 예쁘고 쓰기 편해요. 친구에게도 추천했어요!',
    avatar: '/image/avatar.svg',
    rating: 5,
  },
  {
    id: 3,
    name: '김하늘',
    location: '서울특별시 마포구',
    content:
      '편지를 통해 마음을 전할 수 있어서 너무 좋았어요. 받는 사람도 감동했대요.',
    avatar: '/image/avatar.svg',
    rating: 5,
  },
]

export default function LandingPage() {
  return (
    <div className="">
      <section className="py-20 text-center">
        <div className="relative z-10 -mt-10 flex items-center justify-center">
          <div className="border-primary text-primary relative z-10 rounded-full border bg-white px-6 py-2 text-sm font-medium shadow-md">
            <span className="text-primary flex items-center gap-2 text-sm font-medium">
              <Heart className="size-4" />
              <span>50,000명 이상의 사용자들이 선택했어요</span>
              <Heart className="size-4" />
            </span>
          </div>

          <div className="via-primary absolute inset-x-0 top-1/2 z-0 h-px bg-gradient-to-r from-transparent to-transparent" />
        </div>
        <div className="container px-4 pt-10">
          <h1 className="text-text-primary mb-4 text-[94px] leading-tight font-bold">
            마음을 이어줍니다
          </h1>
          <p className="text-primary mb-8 text-[52px] font-bold">
            간단한 편지의 힘으로
          </p>
          <p className="text-large text-text-secondary mb-8 font-medium">
            감동과 감사의 메시지를 전하고 싶을 때, 쉽고 빠르게 전달하세요.
          </p>
          <div className="flex justify-center gap-4">
            <Button size={'xl'} asChild>
              <Link href={ROUTES.LETTER}>작성 시작하기</Link>
            </Button>
            <Button variant="outline" size={'xl'} asChild>
              <Link href={ROUTES.MY_LETTER}>후기 보기</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="container mx-auto mt-8 mb-14 flex gap-10 rounded-lg bg-white px-4 py-6 shadow-md sm:px-6 lg:px-8">
        <div className="">
          <div>
            <p className="text-text-primary mb-1 text-lg font-bold">
              연말을 위한 추천서비스
            </p>
            <p className="text-text-secondary text-sm">
              편지를 보낼 때마다, 메시지를 전달할 때마다 포인트가 조금씩
              차감됩니다. 더 많은 마음을 전하고 싶을 때는 포인트를 충전해
              주세요.
            </p>
          </div>
        </div>
        <Button size={'xl'} className="ml-auto">
          포토툰 출연
        </Button>
      </section>

      <section className="bg-white py-16">
        <div className="container px-4">
          <h2 className="text-text-primary mb-6 text-center text-[40px] font-semibold">
            우리의 <span className="text-primary">편지 템플릿</span>을
            만나보세요
          </h2>

          <div className="grid grid-cols-1 items-center gap-8 rounded md:grid-cols-2">
            <div className="relative flex h-full items-center justify-center rounded-lg bg-gradient-to-b from-white to-blue-500/80">
              <Image
                src="/image/big-letter.png"
                alt="편지 템플릿"
                fill
                sizes="300px"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-text-primary text-lg font-semibold">
                  인기 주제
                </p>
                <Button variant={'link'} size={'xl'}>
                  더 보기
                </Button>
              </div>
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 rounded-lg border border-blue-100 px-4 py-3"
                  >
                    <Image
                      src="/image/sample-letter-bg.png"
                      alt="편지 템플릿"
                      width={40}
                      height={40}
                      className="size-10 shrink-0 rounded-lg"
                    />
                    <div>
                      <span className="text-text-primary truncate text-sm font-medium">
                        You Are So Precious To Me
                      </span>
                      <div className="text-text-secondary flex items-center gap-2 text-sm">
                        <Tag color="error">#Love</Tag>
                        <Tag color="success">#Precious</Tag>
                      </div>
                    </div>
                    <span className="text-text-primary ml-auto text-sm font-semibold">
                      2004 used
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4">
          <div className="text-center text-2xl">
            <h2 className="mb-4 text-[40px] font-semibold">
              고객님들이 저희를 <span className="text-primary">사랑해요!</span>
            </h2>
            <p className="text-medium font-large mb-10">
              우리는 진심 어린 말이 진정한 연결을 만든다고 믿습니다 — 그리고
              사용자들도 그렇게 생각합니다.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <div
                key={item.id}
                className="rounded-lg border bg-white p-5 shadow-sm"
              >
                <div className="mb-3 flex items-center gap-3">
                  <Image
                    src={item.avatar}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="size-auto rounded-full"
                  />
                  <div>
                    <p className="text-text-primary text-sm font-semibold">
                      {item.name}
                    </p>
                    <p className="text-text-secondary text-xs">
                      {item.location}
                    </p>
                  </div>
                </div>

                <div className="mb-3 flex gap-1 text-yellow-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400" />
                  ))}
                </div>

                <p className="text-medium text-text-primary">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container px-4">
          <div className="text-center">
            <h2 className="mb-4 text-[40px] font-semibold">
              수많은 사람들의 <span className="text-primary">신뢰</span>를 얻다
            </h2>
            <p className="text-medium font-large mb-10">
              모든 편지는 따뜻함, 보살핌, 진정한 연결을 향한 한 걸음 — 전 세계
              가족들의 신뢰를 받고 있습니다.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-5">
            <div className="rounded bg-white p-4 shadow md:col-span-3">
              <p className="mb-25 text-sm">
                “Lorem Ipsum is simply dummy text of the printing and
                typesetting industry.”
              </p>
              <h2 className="text-text-primary text-[60px]">Lorem Ipsum</h2>
              <p className="mb-2 font-semibold">Sarah Johnson</p>
              <p className="text-text-secondary text-medium">
                CEO of XYZ Company
              </p>
              <div className="mt-2 text-right">⭐⭐⭐⭐⭐</div>
            </div>

            <div className="text-primary grid grid-cols-2 gap-4 bg-white md:col-span-2">
              <div className="flex flex-col justify-center rounded p-4 text-center shadow">
                <p className="text-lg font-extrabold">5+</p>
                <p className="text-text-primary text-sm font-semibold">국가</p>
              </div>
              <div className="flex items-center justify-center rounded p-4 shadow">
                <MailStackIcon width={100} height={100} className="text-h1" />
              </div>
              <div className="flex items-center justify-center rounded p-4 shadow">
                <SearchLocationIcon
                  width={100}
                  height={100}
                  className="text-h1"
                />
              </div>
              <div className="flex flex-col justify-center rounded p-4 text-center shadow">
                <p className="text-lg font-extrabold">150+</p>
                <p className="text-text-primary text-sm">우체국</p>
              </div>
            </div>
            <div className="text-primary mt-4 grid grid-cols-1 gap-4 bg-white md:col-span-5 md:grid-cols-3">
              <div className="flex flex-col justify-center rounded p-4 text-center shadow">
                <p className="text-lg font-extrabold">12,000+</p>
                <p className="text-text-primary text-sm font-semibold">
                  배달된 편지
                </p>
              </div>
              <div className="flex flex-col justify-center rounded p-4 text-center shadow">
                <p className="text-lg font-extrabold">35,000+</p>
                <p className="text-text-primary text-sm font-semibold">
                  등록된 사용자
                </p>
              </div>
              <div className="flex items-center justify-center rounded p-4 shadow">
                <Image
                  alt="Message Icon"
                  src="/image/message.png"
                  width={176}
                  height={176}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
