import { fetcher } from '@/lib'
import { API_ENDPOINTS } from '@/utils/constants/api'
import { ApiErrorResponse, ApiResponse } from '@/utils/types/common'
import { ILetterCategory, ILetterTemplate } from '@/utils/types/letter'
import { useQuery } from '@tanstack/react-query'

export const LETTER_KEY = {
  GET_ALL_CATEGORIES: 'GET_ALL_LETTER_CATEGORIES',
  GET_TEMPLATES_BY_CATEGORY: 'GET_TEMPLATES_BY_CATEGORY',
}

export const useGetAllLetterCategories = () => {
  return useQuery<
    ApiResponse<ILetterCategory[]>,
    ApiErrorResponse,
    ApiResponse<ILetterCategory[]>['data']
  >({
    queryKey: [LETTER_KEY.GET_ALL_CATEGORIES],
    queryFn: async () => fetcher(`${API_ENDPOINTS.LETTER_CATEGORIES}`),
    select: (data) => data.data,
  })
}

export const useGetLetterTemplatesByCategory = (categoryId?: number) => {
  return useQuery<
    ApiResponse<ILetterTemplate[]>,
    ApiErrorResponse,
    ApiResponse<ILetterTemplate[]>['data']
  >({
    queryKey: [LETTER_KEY.GET_TEMPLATES_BY_CATEGORY, categoryId],
    queryFn: async () =>
      fetcher(`${API_ENDPOINTS.LETTER_TEMPLATES}/category/${categoryId}`),
    select: (data) => data.data,
    enabled: !!categoryId,
  })
}
