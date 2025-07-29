'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Form, FormCompose } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { useWindowScroll } from '@/hooks'
import { cn } from '@/lib/utils'
import { MapPinIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

interface AddressFormData {
  // Sender fields
  senderService: string
  senderAddress: string
  senderDetailAddress: string
  senderWard: string
  senderPhone: string
  saveSenderInfo: boolean

  // Recipient fields
  recipientCountry: string
  recipientDelivery: string
  recipientAddress: string
  recipientDetailAddress: string
  recipientWard: string
  recipientPhone: string
  saveRecipientInfo: boolean
  addressConfirmation: boolean
}

type Props = {
  hidden?: boolean
  onBack?: () => void
  onContinue?: () => void
}

export function AddressInformation({ hidden, onBack, onContinue }: Props) {
  const { isScrollingUp } = useWindowScroll()
  const form = useForm<AddressFormData>({
    defaultValues: {
      senderService: '',
      senderAddress: '',
      senderDetailAddress: '',
      senderWard: '',
      senderPhone: '',
      saveSenderInfo: false,
      recipientCountry: '',
      recipientDelivery: '',
      recipientAddress: '',
      recipientDetailAddress: '',
      recipientWard: '',
      recipientPhone: '',
      saveRecipientInfo: false,
      addressConfirmation: false,
    },
  })

  const onSubmit = (data: AddressFormData) => {
    console.log('Form data:', data)
    onContinue?.()
  }
  const serviceOptions = [
    { label: '서비스 서비스', value: 'service' },
    { label: '일반 서비스', value: 'general' },
    { label: '특급 서비스', value: 'express' },
  ]

  const countryOptions = [
    { label: '한국 국가 문화는', value: 'korea' },
    { label: '미국', value: 'usa' },
    { label: '일본', value: 'japan' },
  ]

  const deliveryOptions = [
    { label: '직접 구인소드오소시판', value: 'direct' },
    { label: '택배 배송', value: 'delivery' },
    { label: '등기우편', value: 'registered' },
  ]

  return (
    <div hidden={hidden}>
      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="mb-2 text-[40px] font-semibold">
              주소 정보를 <span className="text-primary">입력해주세요!</span>
            </h1>
            <p className="text-large text-text-secondary">
              나의 원기 전자인는 그 시간에에
            </p>
          </div>
          <div className="ml-auto flex gap-4">
            <Button
              size="xl"
              variant="default"
              color="secondary"
              icon={<MapPinIcon />}
            >
              주소찾 찾기
            </Button>
            <Button size="xl" variant="outline" color="tertiary">
              임시저장
            </Button>
          </div>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Sender Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-h3 text-text-primary font-semibold">
                보내시는 분이 <span className="text-primary">누구신가요?</span>
              </h2>
              <FormCompose
                control={form.control}
                name="senderService"
                label=""
                render={(field) => (
                  <Select
                    placeholder="서비스 서비스"
                    options={serviceOptions}
                    className="w-48"
                    {...field}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <FormCompose
                  control={form.control}
                  name="senderAddress"
                  label="주소"
                  render={(field) => (
                    <Input
                      placeholder="예를 들어: HaNoi"
                      className="w-full"
                      {...field}
                    />
                  )}
                />
              </div>

              {/* Detail Address */}
              <div className="col-span-2">
                <FormCompose
                  control={form.control}
                  name="senderDetailAddress"
                  label="상세주소"
                  render={(field) => (
                    <Input
                      placeholder="예를 들어: 20a 565 Lac Long Quan Tay Ho"
                      className="w-full"
                      {...field}
                    />
                  )}
                />
              </div>
              {/* Ward */}
              <div className="col-span-2 sm:col-span-1">
                <FormCompose
                  control={form.control}
                  name="senderWard"
                  label="어름"
                  render={(field) => (
                    <Input
                      placeholder="예를 들어: Phuong Tang"
                      className="w-full"
                      {...field}
                    />
                  )}
                />
              </div>
              {/* Phone */}
              <div className="col-span-2 sm:col-span-1">
                <FormCompose
                  control={form.control}
                  name="senderPhone"
                  label="전화번호"
                  render={(field) => (
                    <Input
                      placeholder="예를 들어: 01012346678"
                      className="w-full"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="mt-4 flex items-center space-x-2">
              <Checkbox />
              <Label htmlFor="save-sender-info" className="text-sm">
                볼러만의 화장상태 법소를 분야의 하기되니다.
              </Label>
            </div>
          </div>

          {/* Recipient Information */}
          <div className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-text-primary text-h3 font-semibold">
                받으시는 분이 <span className="text-primary">누구신가요?</span>
              </h2>
              <div className="flex gap-2">
                <FormCompose
                  control={form.control}
                  name="recipientCountry"
                  label=""
                  render={(field) => (
                    <Select
                      placeholder="한국 국가 문화는"
                      options={countryOptions}
                      className="w-48"
                      {...field}
                    />
                  )}
                />
                <FormCompose
                  control={form.control}
                  name="recipientDelivery"
                  label=""
                  render={(field) => (
                    <Select
                      placeholder="직접 구인소드오소시판"
                      options={deliveryOptions}
                      className="w-48"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {/* Address */}
              <div className="col-span-2">
                <FormCompose
                  control={form.control}
                  name="recipientAddress"
                  label="주소"
                  description="실제 배송 상황 장소를 거의 아는아실 거의, 실제 전국's 호신우 산에 천번 운서원는 문신."
                  render={(field) => (
                    <Input
                      placeholder="예를 들어: HaNoi"
                      className="w-full"
                      {...field}
                    />
                  )}
                />
              </div>

              {/* Detail Address */}
              <div className="col-span-2">
                <FormCompose
                  control={form.control}
                  name="recipientDetailAddress"
                  label="상세주소"
                  render={(field) => (
                    <Input
                      placeholder="예를 들어: 20a 565 Lac Long Quan Tay Ho"
                      className="w-full"
                      {...field}
                    />
                  )}
                />
              </div>
              {/* Ward */}
              <div className="col-span-2 sm:col-span-1">
                <FormCompose
                  control={form.control}
                  name="recipientWard"
                  label="어름"
                  render={(field) => (
                    <Input
                      placeholder="예를 들어: Phuong Tang"
                      className="w-full"
                      {...field}
                    />
                  )}
                />
              </div>
              <div className="col-span-2 sm:col-span-1">
                {/* Phone */}
                <FormCompose
                  control={form.control}
                  name="recipientPhone"
                  label="전화번호(서바)"
                  description="주문혔의 상황 수 근로새의이 뷰을 성집여할 것입니다."
                  render={(field) => (
                    <Input
                      placeholder="예를 들어: 01012346678"
                      className="w-full"
                      {...field}
                    />
                  )}
                />
              </div>
            </div>
            {/* Checkboxes */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="save-recipient-info" />
                <Label htmlFor="save-recipient-info" className="text-sm">
                  주지먹 확인
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="address-confirmation" />
                <Label htmlFor="address-confirmation" className="text-sm">
                  거르조건 실창 생활
                </Label>
              </div>
            </div>
          </div>

          {/* Floating Action Buttons */}
          <div
            className={cn(
              'fixed right-0 bottom-0 left-0 z-10',
              'translate-y-0 transition-all duration-500 ease-out will-change-transform',
              {
                'pointer-events-none translate-y-full': !isScrollingUp,
              }
            )}
          >
            <div className="container pt-8 pb-6">
              <div className="flex gap-3 rounded-xl border border-blue-100/50 bg-white/90 p-2 shadow-xl">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="flex-1 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  onClick={onBack}
                >
                  이전
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  className="flex-1 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  등록
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
