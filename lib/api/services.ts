import { apiClient, ApiResponse } from '../api-client'

// Types
export interface User {
  id: string
  email: string
  name: string | null
  avatar: string | null
  role: 'USER' | 'ADMIN' | 'MODERATOR'
  createdAt: string
  updatedAt: string
}

export interface Post {
  id: string
  title: string
  content: string | null
  slug: string
  published: boolean
  featured: boolean
  viewCount: number
  publishedAt: string | null
  createdAt: string
  updatedAt: string
  author: {
    id: string
    name: string
    email: string
  }
  category: {
    id: string
    name: string
    slug: string
  } | null
  tags: {
    id: string
    name: string
    slug: string
  }[]
}

export interface Category {
  id: string
  name: string
  description: string | null
  slug: string
  createdAt: string
  updatedAt: string
}

export interface Tag {
  id: string
  name: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface CreatePostData {
  title: string
  content?: string
  slug: string
  published?: boolean
  categoryId?: string
  tagIds?: string[]
}

export interface UpdatePostData {
  title?: string
  content?: string
  published?: boolean
  categoryId?: string
  tagIds?: string[]
}

export interface PostsQueryParams {
  page?: number
  limit?: number
  search?: string
  category?: string
  published?: boolean
}

// Posts API Service
export const postsService = {
  // Get all posts with pagination and filters
  async getPosts(params?: PostsQueryParams): Promise<ApiResponse<Post[]>> {
    return apiClient.get<Post[]>('/api/posts', params)
  },

  // Get single post by ID
  async getPost(id: string): Promise<ApiResponse<Post>> {
    return apiClient.get<Post>(`/api/posts/${id}`)
  },

  // Get post by slug
  async getPostBySlug(slug: string): Promise<ApiResponse<Post>> {
    return apiClient.get<Post>(`/api/posts/slug/${slug}`)
  },

  // Create new post
  async createPost(data: CreatePostData): Promise<ApiResponse<Post>> {
    return apiClient.post<Post>('/api/posts', data)
  },

  // Update post
  async updatePost(
    id: string,
    data: UpdatePostData
  ): Promise<ApiResponse<Post>> {
    return apiClient.put<Post>(`/api/posts/${id}`, data)
  },

  // Delete post
  async deletePost(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete(`/api/posts/${id}`)
  },

  // Get featured posts
  async getFeaturedPosts(limit = 5): Promise<ApiResponse<Post[]>> {
    return apiClient.get<Post[]>('/api/posts', { featured: true, limit })
  },
}

// Users API Service
export const usersService = {
  // Get all users
  async getUsers(params?: {
    page?: number
    limit?: number
  }): Promise<ApiResponse<User[]>> {
    return apiClient.get<User[]>('/api/users', params)
  },

  // Get single user
  async getUser(id: string): Promise<ApiResponse<User>> {
    return apiClient.get<User>(`/api/users/${id}`)
  },

  // Get current user profile
  async getProfile(): Promise<ApiResponse<User>> {
    return apiClient.get<User>('/api/users/profile')
  },

  // Update user profile
  async updateProfile(data: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put<User>('/api/users/profile', data)
  },

  // Upload user avatar
  async uploadAvatar(file: File): Promise<ApiResponse<{ avatar: string }>> {
    return apiClient.uploadFile<{ avatar: string }>('/api/users/avatar', file)
  },
}

// Categories API Service
export const categoriesService = {
  // Get all categories
  async getCategories(): Promise<ApiResponse<Category[]>> {
    return apiClient.get<Category[]>('/api/categories')
  },

  // Get single category
  async getCategory(id: string): Promise<ApiResponse<Category>> {
    return apiClient.get<Category>(`/api/categories/${id}`)
  },

  // Get category by slug
  async getCategoryBySlug(slug: string): Promise<ApiResponse<Category>> {
    return apiClient.get<Category>(`/api/categories/slug/${slug}`)
  },

  // Create category
  async createCategory(data: {
    name: string
    description?: string
    slug: string
  }): Promise<ApiResponse<Category>> {
    return apiClient.post<Category>('/api/categories', data)
  },

  // Update category
  async updateCategory(
    id: string,
    data: Partial<Category>
  ): Promise<ApiResponse<Category>> {
    return apiClient.put<Category>(`/api/categories/${id}`, data)
  },

  // Delete category
  async deleteCategory(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete(`/api/categories/${id}`)
  },
}

// Tags API Service
export const tagsService = {
  // Get all tags
  async getTags(): Promise<ApiResponse<Tag[]>> {
    return apiClient.get<Tag[]>('/api/tags')
  },

  // Get single tag
  async getTag(id: string): Promise<ApiResponse<Tag>> {
    return apiClient.get<Tag>(`/api/tags/${id}`)
  },

  // Create tag
  async createTag(data: {
    name: string
    slug: string
  }): Promise<ApiResponse<Tag>> {
    return apiClient.post<Tag>('/api/tags', data)
  },

  // Update tag
  async updateTag(id: string, data: Partial<Tag>): Promise<ApiResponse<Tag>> {
    return apiClient.put<Tag>(`/api/tags/${id}`, data)
  },

  // Delete tag
  async deleteTag(id: string): Promise<ApiResponse<{ message: string }>> {
    return apiClient.delete(`/api/tags/${id}`)
  },
}

// Auth API Service
export const authService = {
  // Login
  async login(
    email: string,
    password: string
  ): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await apiClient.post<{ user: User; token: string }>(
      '/api/auth/login',
      {
        email,
        password,
      }
    )

    // Set auth token after successful login
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token)
    }

    return response
  },

  // Register
  async register(data: {
    email: string
    password: string
    name: string
  }): Promise<ApiResponse<{ user: User; token: string }>> {
    const response = await apiClient.post<{ user: User; token: string }>(
      '/api/auth/register',
      data
    )

    // Set auth token after successful registration
    if (response.data.token) {
      apiClient.setAuthToken(response.data.token)
    }

    return response
  },

  // Logout
  async logout(): Promise<void> {
    try {
      await apiClient.post('/api/auth/logout')
    } finally {
      // Clear auth token regardless of API response
      apiClient.setAuthToken(null)
    }
  },

  // Refresh token
  async refreshToken(): Promise<ApiResponse<{ token: string }>> {
    const response = await apiClient.post<{ token: string }>(
      '/api/auth/refresh'
    )

    if (response.data.token) {
      apiClient.setAuthToken(response.data.token)
    }

    return response
  },

  // Forgot password
  async forgotPassword(
    email: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/api/auth/forgot-password', {
      email,
    })
  },

  // Reset password
  async resetPassword(
    token: string,
    password: string
  ): Promise<ApiResponse<{ message: string }>> {
    return apiClient.post<{ message: string }>('/api/auth/reset-password', {
      token,
      password,
    })
  },
}

// Health API Service
export const healthService = {
  // Check API health
  async checkHealth(): Promise<
    ApiResponse<{
      status: string
      timestamp: string
      environment: string
      version: string
      database: string
    }>
  > {
    return apiClient.get('/api/health')
  },
}

// Combined export for easy access
export const api = {
  posts: postsService,
  users: usersService,
  categories: categoriesService,
  tags: tagsService,
  auth: authService,
  health: healthService,
}

export default api
