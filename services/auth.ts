import { fetcher } from '@/lib'
import { API_ENDPOINTS } from '@/utils/constants/api'
import {
  ILoginFormValues,
  ILoginResponse,
  IUserProfile,
} from '@/utils/types/auth'
import { ApiErrorResponse } from '@/utils/types/common'
import {
  UndefinedInitialDataOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query'

export const AUTH_KEY = {
  GET_USER_INFO: 'GET_USER_INFO',
}

export const useLogin = () => {
  return useMutation<ILoginResponse, ApiErrorResponse, ILoginFormValues>({
    mutationFn: async (body) =>
      fetcher(`${API_ENDPOINTS.AUTH}/login`, {
        method: 'POST',
        body,
      }),
  })
}

export const useRegister = () => {
  return useMutation<any, ApiErrorResponse, ILoginFormValues>({
    mutationFn: async (data) =>
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

export const GET_USER_PROFILE_QUERY_OPTIONS: UndefinedInitialDataOptions<
  IUserProfile,
  ApiErrorResponse,
  IUserProfile['data'],
  readonly unknown[]
> = {
  queryKey: [AUTH_KEY.GET_USER_INFO],
  queryFn: async () => fetcher(`${API_ENDPOINTS.AUTH}/profile`),
  select: (data) => data.data,
}
export const useGetUserProfile = (enabled = true) => {
  return useQuery<IUserProfile, ApiErrorResponse, IUserProfile['data']>({
    ...GET_USER_PROFILE_QUERY_OPTIONS,
    enabled,
  })
}
