import { useState, useEffect, useCallback } from 'react'
import { ApiResponse, ApiError } from '../api-client'

// Generic API hook state
interface ApiState<T> {
  data: T | null
  loading: boolean
  error: ApiError | null
}

// Hook options
interface UseApiOptions {
  immediate?: boolean // Execute immediately on mount
  onSuccess?: (data: any) => void
  onError?: (error: ApiError) => void
}

// Generic API hook
export function useApi<T>(
  apiCall: () => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: immediate,
    error: null,
  })

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const response = await apiCall()
      setState({
        data: response.data,
        loading: false,
        error: null,
      })

      if (onSuccess) {
        onSuccess(response.data)
      }

      return response.data
    } catch (error) {
      const apiError = error as ApiError
      setState({
        data: null,
        loading: false,
        error: apiError,
      })

      if (onError) {
        onError(apiError)
      }

      throw error
    }
  }, [apiCall, onSuccess, onError])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return {
    ...state,
    execute,
    refetch: execute,
  }
}

// Mutation hook for POST/PUT/DELETE operations
export function useMutation<T, TVariables = any>(
  mutationFn: (variables: TVariables) => Promise<ApiResponse<T>>,
  options: UseApiOptions = {}
) {
  const { onSuccess, onError } = options

  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  const mutate = useCallback(
    async (variables: TVariables) => {
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await mutationFn(variables)
        setState({
          data: response.data,
          loading: false,
          error: null,
        })

        if (onSuccess) {
          onSuccess(response.data)
        }

        return response.data
      } catch (error) {
        const apiError = error as ApiError
        setState({
          data: null,
          loading: false,
          error: apiError,
        })

        if (onError) {
          onError(apiError)
        }

        throw error
      }
    },
    [mutationFn, onSuccess, onError]
  )

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    mutate,
    reset,
  }
}

// Paginated API hook
interface PaginatedApiState<T> {
  data: T[]
  loading: boolean
  error: ApiError | null
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  } | null
}

export function usePaginatedApi<T>(
  apiCall: (params: {
    page: number
    limit: number
    [key: string]: any
  }) => Promise<ApiResponse<T[]>>,
  initialParams: { page?: number; limit?: number; [key: string]: any } = {},
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options

  const [state, setState] = useState<PaginatedApiState<T>>({
    data: [],
    loading: immediate,
    error: null,
    pagination: null,
  })

  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    ...initialParams,
  })

  const execute = useCallback(
    async (newParams?: any) => {
      const finalParams = newParams ? { ...params, ...newParams } : params
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await apiCall(finalParams)
        setState({
          data: response.data,
          loading: false,
          error: null,
          pagination: response.pagination || null,
        })

        if (onSuccess) {
          onSuccess(response.data)
        }

        return response.data
      } catch (error) {
        const apiError = error as ApiError
        setState((prev) => ({
          ...prev,
          loading: false,
          error: apiError,
        }))

        if (onError) {
          onError(apiError)
        }

        throw error
      }
    },
    [apiCall, params, onSuccess, onError]
  )

  const setPage = useCallback((page: number) => {
    setParams((prev) => ({ ...prev, page }))
  }, [])

  const setLimit = useCallback((limit: number) => {
    setParams((prev) => ({ ...prev, limit, page: 1 }))
  }, [])

  const setFilters = useCallback((filters: any) => {
    setParams((prev) => ({ ...prev, ...filters, page: 1 }))
  }, [])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  useEffect(() => {
    execute()
  }, [params.page, params.limit])

  return {
    ...state,
    params,
    execute,
    refetch: execute,
    setPage,
    setLimit,
    setFilters,
    nextPage: state.pagination
      ? () => setPage(state.pagination!.page + 1)
      : undefined,
    prevPage: state.pagination
      ? () => setPage(Math.max(1, state.pagination!.page - 1))
      : undefined,
  }
}

// Infinite scroll hook
export function useInfiniteApi<T>(
  apiCall: (params: {
    page: number
    limit: number
    [key: string]: any
  }) => Promise<ApiResponse<T[]>>,
  initialParams: { limit?: number; [key: string]: any } = {},
  options: UseApiOptions = {}
) {
  const { immediate = true, onSuccess, onError } = options

  const [state, setState] = useState<{
    data: T[]
    loading: boolean
    error: ApiError | null
    hasMore: boolean
    page: number
  }>({
    data: [],
    loading: immediate,
    error: null,
    hasMore: true,
    page: 1,
  })

  const [params] = useState({
    limit: 10,
    ...initialParams,
  })

  const loadMore = useCallback(
    async (reset = false) => {
      const currentPage = reset ? 1 : state.page
      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        const response = await apiCall({ ...params, page: currentPage })
        setState((prev) => ({
          data: reset ? response.data : [...prev.data, ...response.data],
          loading: false,
          error: null,
          hasMore: response.pagination
            ? currentPage < response.pagination.pages
            : false,
          page: currentPage + 1,
        }))

        if (onSuccess) {
          onSuccess(response.data)
        }

        return response.data
      } catch (error) {
        const apiError = error as ApiError
        setState((prev) => ({
          ...prev,
          loading: false,
          error: apiError,
        }))

        if (onError) {
          onError(apiError)
        }

        throw error
      }
    },
    [apiCall, params, state.page, onSuccess, onError]
  )

  const refresh = useCallback(() => {
    return loadMore(true)
  }, [loadMore])

  useEffect(() => {
    if (immediate) {
      loadMore(true)
    }
  }, [immediate, loadMore])

  return {
    ...state,
    loadMore: () => loadMore(false),
    refresh,
  }
}
