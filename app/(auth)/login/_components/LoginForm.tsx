'use client'

import { Button } from '@/components/ui/button'
import { Form, FormCompose } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { LOGIN_MESSAGES } from '@/utils/constants/messages'
import { ILoginFormValues } from '@/utils/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const loginSchema = z.object({
  phoneNumber: z
    .string()
    .min(10, LOGIN_MESSAGES.phone.min)
    .max(15, LOGIN_MESSAGES.phone.max)
    .regex(/^[0-9]+$/, LOGIN_MESSAGES.phone.regex),
  password: z.string().min(6, LOGIN_MESSAGES.password.min),
})

export function LoginForm() {
  const { onLogin, isLogging } = useAuth()
  const form = useForm<ILoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      phoneNumber: '',
      password: '',
    },
  })

  async function handleSubmit(values: ILoginFormValues) {
    await onLogin(values)
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormCompose
          control={form.control}
          name="phoneNumber"
          label="휴대번호"
          render={(field) => (
            <Input
              type="tel"
              placeholder="예를 들어: 01012345678"
              autoComplete="tel"
              {...field}
            />
          )}
        />
        <FormCompose
          control={form.control}
          name="password"
          label="비밀번호"
          render={(field) => (
            <Input
              type="password"
              placeholder="*********"
              autoComplete="current-password"
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          className="mb-6 w-full"
          size={'lg'}
          loading={isLogging}
        >
          로그인
        </Button>
      </form>
    </Form>
  )
}
