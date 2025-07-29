'use client'

import { Button } from '@/components/ui/button'
import { Form, FormCompose } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { LOGIN_MESSAGES } from '@/utils/constants/messages'
import { IForgotPasswordFormValues } from '@/utils/types/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

const forgotPasswordSchema = z.object({
  name: z.string().min(1, LOGIN_MESSAGES.name.min),
  email: z.string().email(LOGIN_MESSAGES.email.invalid),
})

export function ForgotPasswordForm() {
  const form = useForm<IForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      name: '',
      email: '',
    },
    mode: 'onChange',
  })

  async function handleSubmit(values: IForgotPasswordFormValues) {
    try {
      // TODO: Implement forgot password API call
      console.log('Forgot password values:', values)
      toast.success('비밀번호 재설정 이메일이 발송되었습니다.')
    } catch (error) {
      toast.error('오류가 발생했습니다. 다시 시도해주세요.')
    }
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
              placeholder="예를 들어: Nguyen Van A"
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
        <Button type="submit" className="w-full" size="lg">
          이메일 받기
        </Button>
      </form>
    </Form>
  )
}
