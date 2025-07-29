import { fetcher } from '@/lib'
import { API_ENDPOINTS } from '@/utils/constants/api'
import { ApiErrorResponse, ApiResponse } from '@/utils/types/common'
import {
  ILetterCategory,
  ILetterTemplate,
  ILetterDraft,
  ICreateDraftBody,
  IAttachFilesToLetterRequest,
  ILetterFile,
  ILetterResponse,
} from '@/utils/types/letter'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const LETTER_KEY = {
  GET_ALL_CATEGORIES: 'GET_ALL_LETTER_CATEGORIES',
  GET_TEMPLATES_BY_CATEGORY: 'GET_TEMPLATES_BY_CATEGORY',
  GET_DRAFTS: 'GET_LETTER_DRAFTS',
  CREATE_DRAFT: 'CREATE_LETTER_DRAFT',
  UPDATE_DRAFT: 'UPDATE_LETTER_DRAFT',
  ATTACH_FILES: 'ATTACH_FILES_TO_LETTER',
  GET_LETTER_FILES: 'GET_LETTER_FILES',
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

// Letter Drafts Hooks
export const useGetLetterDrafts = () => {
  return useQuery<
    ApiResponse<ILetterDraft[]>,
    ApiErrorResponse,
    ApiResponse<ILetterDraft[]>['data']
  >({
    queryKey: [LETTER_KEY.GET_DRAFTS],
    queryFn: async () => fetcher(`${API_ENDPOINTS.LETTERS}/drafts`),
    select: (data) => data.data,
  })
}

export const useCreateLetterDraft = () => {
  const queryClient = useQueryClient()
  return useMutation<
    ApiResponse<ILetterResponse>,
    ApiErrorResponse,
    ICreateDraftBody
  >({
    mutationKey: [LETTER_KEY.CREATE_DRAFT],
    mutationFn: async (body: ICreateDraftBody) => {
      return fetcher(`${API_ENDPOINTS.LETTERS}`, {
        method: 'POST',
        body,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LETTER_KEY.GET_DRAFTS] })
    },
  })
}

export const useGetLetterFiles = (letterId: number) => {
  return useQuery<
    ApiResponse<ILetterFile[]>,
    ApiErrorResponse,
    ApiResponse<ILetterFile[]>['data']
  >({
    queryKey: [LETTER_KEY.GET_LETTER_FILES, letterId],
    queryFn: async () => fetcher(`${API_ENDPOINTS.LETTERS}/${letterId}/files`),
    select: (data) => data.data,
    enabled: !!letterId,
  })
}

export const useAttachFilesToLetter = () => {
  return useMutation<
    ApiResponse<ILetterFile[]>,
    ApiErrorResponse,
    IAttachFilesToLetterRequest
  >({
    mutationKey: [LETTER_KEY.ATTACH_FILES],
    mutationFn: async ({
      letter_id,
      type,
      files,
    }: IAttachFilesToLetterRequest) => {
      // Create FormData for file upload
      const formData = new FormData()

      // Add type to FormData
      formData.append('type', type)

      // Add all files to FormData
      files.forEach((file) => {
        formData.append('files', file)
      })

      return fetcher(`${API_ENDPOINTS.LETTERS}/${letter_id}/files`, {
        method: 'POST',
        body: formData,
      })
    },
  })
}
