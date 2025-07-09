import { fetcher } from '@/libs'
import { useMutation, useQuery } from '@tanstack/react-query'

export const AUTH_KEY = {
  GET_USER_INFO: 'GET_USER_INFO',
}

export const useLogin = (data: { email: string; password: string }) => {
  return useMutation({
    mutationFn: async () =>
      fetcher('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(data),
      }),
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: async () =>
      fetcher('/api/auth/logout', {
        method: 'POST',
      }),
  })
}

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [AUTH_KEY.GET_USER_INFO],
    queryFn: async () => fetcher('/api/auth/user-info'),
  })
}
