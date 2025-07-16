'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

export default function LoginPage() {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: { email: string; password: string }) {
    // handle login logic here
    console.log(values)
  }

  return (
    <div className="">
      <h1 className="my-6 mb-8 text-center text-2xl font-bold">회원가입</h1>
      <Card className="px-10 py-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      autoComplete="email"
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
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      {...field}
                    />
                  </FormControl>
                  <div className="mt-1 flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
        <Button variant="outline" className="mt-4 w-full">
          Guest Access
        </Button>
        <div className="mt-4 text-center text-sm">
          Don&#39;t have an account?{' '}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
        <div className="my-6 flex items-center">
          <div className="h-px flex-grow bg-gray-200" />
          <span className="mx-3 text-xs text-gray-400">or log in with</span>
          <div className="h-px flex-grow bg-gray-200" />
        </div>
        <div className="flex justify-center gap-3">
          <Button variant="outline" className="flex-1">
            Google
          </Button>
          <Button variant="outline" className="flex-1">
            Kakao
          </Button>
          <Button variant="outline" className="flex-1">
            Naver
          </Button>
          <Button variant="outline" className="flex-1">
            Apple
          </Button>
        </div>
      </Card>
    </div>
  )
}
