'use client'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'
import { useForm } from 'react-hook-form'

type SignupFormValues = {
  name: string
  mobile: string
  email: string
  password: string
  confirmPassword: string
}

export default function OrderLookupPage() {
  const form = useForm<SignupFormValues>({
    defaultValues: {
      name: '',
      mobile: '',
      email: '',
    },
  })

  function onSubmit(values: SignupFormValues) {
    if (values.password !== values.confirmPassword) {
      form.setError('confirmPassword', { message: 'Passwords do not match' })
      return
    }
  }

  return (
    <div className="mx-auto my-20 max-w-md rounded-lg border bg-white p-8 shadow-lg">
      <h1 className="mb-8 text-center text-2xl font-bold">
        주문조회를 하시겠어요?
      </h1>
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>이름</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="예를 들어: Nguyen Van A"
                    autoComplete="name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mobile"
            render={({ field }) => (
              <FormItem>
                <FormLabel>휴대번호</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="예를 들어: 01012345678"
                    autoComplete="tel"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="임의의 숫자 4자리"
                    placeholder="**********"
                    autoComplete="new-password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            조회하기
          </Button>
        </form>
      </Form>
    </div>
  )
}
