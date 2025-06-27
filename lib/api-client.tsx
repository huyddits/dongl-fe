import { config } from './config'

// Types
export interface ApiResponse<T = any> {
  data: T
  message?: string
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface ApiError {
  error: string
  message?: string
  details?: any
  status: number
}

// Request interceptor type
type RequestInterceptor = (config: RequestInit & { url: string }) => RequestInit & { url: string }

// Response interceptor type
type ResponseInterceptor = (response: Response) => Promise<Response>

class ApiClient {
  private baseURL: string
  private requestInterceptors: RequestInterceptor[] = []
  private responseInterceptors: ResponseInterceptor[] = []
  private authToken: string | null = null

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.setupDefaultInterceptors()
  }

  // Setup default interceptors
  private setupDefaultInterceptors() {
    // Default request interceptor
    this.addRequestInterceptor((config: any) => {
      // Add auth token if available
      if (this.authToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${this.authToken}`,
        }
      }

      // Add default headers
      config.headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...config.headers,
      }

      // Add timestamp for cache busting if needed
      if (config.method === 'GET') {
        const url = new URL(config.url, this.baseURL)
        url.searchParams.set('_t', Date.now().toString())
        config.url = url.toString()
      }

      // Log request in development
      if (config.app?.env === 'development') {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, {
          headers: config.headers,
          body: config.body,
        })
      }

      return config
    })

    // Default response interceptor
    this.addResponseInterceptor(async (response) => {
      // Log response in development
      if (config.app.env === 'development') {
        console.log(`📦 API Response: ${response.status} ${response.url}`, {
          status: response.status,
          headers: Object.fromEntries(response.headers.entries()),
        })
      }

      // Handle common error status codes
      if (response.status === 401) {
        // Unauthorized - clear auth token and redirect to login
        this.setAuthToken(null)
        if (typeof window !== 'undefined') {
          window.location.href = '/login'
        }
      }

      if (response.status === 403) {
        // Forbidden - show error message
        console.error('Access forbidden. You don\'t have permission to access this resource.')
      }

      if (response.status >= 500) {
        // Server error - show generic error message
        console.error('Server error. Please try again later.')
      }

      return response
    })
  }

  // Add request interceptor
  addRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor)
  }

  // Add response interceptor
  addResponseInterceptor(interceptor: ResponseInterceptor) {
    this.responseInterceptors.push(interceptor)
  }

  // Set auth token
  setAuthToken(token: string | null) {
    this.authToken = token
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token)
      } else {
        localStorage.removeItem('auth_token')
      }
    }
  }

  // Get auth token
  getAuthToken(): string | null {
    if (this.authToken) return this.authToken
    
    if (typeof window !== 'undefined') {
      return localStorage.getItem('auth_token')
    }
    
    return null
  }

  // Initialize auth token from storage
  initAuthToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.authToken = token
      }
    }
  }

  // Private method to execute request with interceptors
  private async executeRequest(url: string, options: RequestInit = {}): Promise<Response> {
    let requestConfig = { ...options, url }

    // Apply request interceptors
    for (const interceptor of this.requestInterceptors) {
      requestConfig = interceptor(requestConfig)
    }

    // Make the actual request
    const fullUrl = requestConfig.url.startsWith('http') 
      ? requestConfig.url 
      : `${this.baseURL}${requestConfig.url}`

    let response = await fetch(fullUrl, {
      ...requestConfig,
      url: undefined, // Remove url from fetch options
    } as RequestInit)

    // Apply response interceptors
    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response)
    }

    return response
  }

  // Generic request method
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.executeRequest(url, options)

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const error: ApiError = {
          error: errorData.error || 'Request failed',
          message: errorData.message || response.statusText,
          details: errorData.details,
          status: response.status,
        }
        throw error
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof Error && error.name === 'TypeError') {
        // Network error
        throw {
          error: 'Network Error',
          message: 'Unable to connect to server. Please check your connection.',
          status: 0,
        } as ApiError
      }
      throw error
    }
  }

  // HTTP Methods
  async get<T>(url: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
    const searchParams = new URLSearchParams()
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, value.toString())
        }
      })
    }
    
    const queryString = searchParams.toString()
    const fullUrl = queryString ? `${url}?${queryString}` : url
    
    return this.request<T>(fullUrl, { method: 'GET' })
  }

  async post<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async put<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async patch<T>(url: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(url, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    })
  }

  async delete<T>(url: string): Promise<ApiResponse<T>> {
    return this.request<T>(url, { method: 'DELETE' })
  }

  // File upload method
  async uploadFile<T>(url: string, file: File, additionalData?: Record<string, any>): Promise<ApiResponse<T>> {
    const formData = new FormData()
    formData.append('file', file)
    
    if (additionalData) {
      Object.entries(additionalData).forEach(([key, value]) => {
        formData.append(key, value.toString())
      })
    }

    return this.executeRequest(url, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type for FormData, let browser set it with boundary
    }).then(async (response) => {
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw {
          error: errorData.error || 'Upload failed',
          message: errorData.message || response.statusText,
          status: response.status,
        } as ApiError
      }
      return response.json()
    })
  }
}

// Create API client instance
export const apiClient = new ApiClient(config.app.apiUrl)

// Initialize auth token on client side
if (typeof window !== 'undefined') {
  apiClient.initAuthToken()
}

// Export for easy access
export default apiClient