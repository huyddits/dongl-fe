import { fetcher } from '@/lib'
import { API_ENDPOINTS } from '@/utils/constants/api'
import { useMutation, useQuery } from '@tanstack/react-query'

export const AUTH_KEY = {
  GET_USER_INFO: 'GET_USER_INFO',
}

export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: any) =>
      fetcher(`${API_ENDPOINTS.AUTH}/login`, {
        method: 'POST',
        body: data,
      }),
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (data: any) =>
      fetcher(`${API_ENDPOINTS.AUTH}/register`, {
        method: 'POST',
        body: data,
      }),
  })
}

export const useLogout = () => {
  return useMutation({
    mutationFn: async () =>
      fetcher(`${API_ENDPOINTS.AUTH}/logout`, {
        method: 'POST',
      }),
  })
}

export const useGetUserInfo = () => {
  return useQuery({
    queryKey: [AUTH_KEY.GET_USER_INFO],
    queryFn: async () => fetcher(`${API_ENDPOINTS.AUTH}/user-info`),
  })
}
