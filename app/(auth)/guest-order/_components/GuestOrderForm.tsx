'use client'

import { Button } from '@/components/ui/button'
import { Form, FormCompose } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LOGIN_MESSAGES } from '@/utils/constants/messages'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type GuestOrderFormValues = {
  name: string
  mobile: string
  password: string
}

const guestOrderSchema = z.object({
  name: z.string().min(1, LOGIN_MESSAGES.name.min),
  mobile: z.string().length(11, LOGIN_MESSAGES.phone.exact),
  password: z.string().min(4, '비밀번호는 4자리 숫자여야 합니다.'),
})

export function GuestOrderForm() {
  const form = useForm<GuestOrderFormValues>({
    resolver: zodResolver(guestOrderSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      mobile: '',
      password: '',
    },
  })

  async function handleSubmit(values: GuestOrderFormValues) {
    console.log('Guest order lookup:', values)
    // TODO: Implement guest order lookup logic
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormCompose
          control={form.control}
          name="name"
          label="휴대번호"
          render={(field) => (
            <Input
              type="text"
              placeholder="예를 들어: 01012345678"
              autoComplete="name"
              {...field}
            />
          )}
        />
        <FormCompose
          control={form.control}
          name="mobile"
          label="휴대번호"
          render={(field) => (
            <Input
              number
              type="text"
              placeholder="예를 들어: Nguyen Van A"
              autoComplete="tel"
              {...field}
            />
          )}
        />
        <FormCompose
          control={form.control}
          name="password"
          label="임의의 숫자 4자리"
          render={(field) => (
            <Input
              type="password"
              placeholder="예를 들어: 2345"
              autoComplete="current-password"
              {...field}
            />
          )}
        />
        <Button type="submit" className="w-full" size="lg">
          조회하기
        </Button>
      </form>
    </Form>
  )
}
