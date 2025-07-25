export type ApiResponse<T> = {
  data: T
  message: string
  success: boolean
  path: string
  timestamp: string
}

export type ApiErrorResponse<T = unknown> = {
  data: T
  message: string
  success: false
  path: string
  timestamp: string
}
