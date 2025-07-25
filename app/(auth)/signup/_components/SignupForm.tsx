'use client'

import { Button } from '@/components/ui/button'
import { Form, FormCompose } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/hooks/useAuth'
import { LOGIN_MESSAGES } from '@/utils/constants/messages'
import { ISignupFormValues } from '@/utils/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

type FormSignUp = ISignupFormValues & {
  confirmPassword: string
}
const signupSchema = z
  .object({
    name: z.string().min(1, LOGIN_MESSAGES.name.min),
    email: z.string().email(LOGIN_MESSAGES.email.invalid),
    phoneNumber: z.string().length(11, LOGIN_MESSAGES.phone.exact),
    password: z.string().min(4, LOGIN_MESSAGES.password.min),
    confirmPassword: z.string().min(4, LOGIN_MESSAGES.confirmPassword.min),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: LOGIN_MESSAGES.confirmPassword.mismatch,
    path: ['confirmPassword'],
  })

export default function SignupForm() {
  const { isRegistering, onRegister } = useAuth()
  const form = useForm<FormSignUp>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function handleSubmit({ confirmPassword, ...values }: FormSignUp) {
    void onRegister(values)
  }

  return (
    <Form {...form}>
      <form className="space-y-5" onSubmit={form.handleSubmit(handleSubmit)}>
        <FormCompose
          control={form.control}
          name="name"
          label="이름"
          render={(field) => (
            <Input
              type="text"
              placeholder="예를 들어: 홍길동"
              autoComplete="name"
              {...field}
            />
          )}
        />
        <FormCompose
          control={form.control}
          name="email"
          label="이메일"
          render={(field) => (
            <Input
              type="email"
              placeholder="예를 들어: abcd@gmail.com"
              autoComplete="email"
              {...field}
            />
          )}
        />
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
              autoComplete="new-password"
              {...field}
            />
          )}
        />
        <FormCompose
          control={form.control}
          name="confirmPassword"
          label="비밀번호 재확인"
          render={(field) => (
            <Input
              type="password"
              placeholder="*********"
              autoComplete="new-password"
              {...field}
            />
          )}
        />
        <Button
          type="submit"
          className="w-full"
          size="lg"
          loading={isRegistering}
        >
          회원가입
        </Button>
      </form>
    </Form>
  )
}
