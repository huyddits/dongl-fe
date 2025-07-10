export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  POSTS: '/posts',
  SSR_EXAMPLE: '/examples/ssr',
  SSG_EXAMPLE: '/examples/ssg',
  CSR_EXAMPLE: '/examples/csr',
  API: {
    POSTS: '/api/posts',
    USERS: '/api/users',
    HEALTH: '/api/health',
  },
} as const

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
} as const

export const CACHE_TAGS = {
  POSTS: 'posts',
  USERS: 'users',
  CATEGORIES: 'categories',
} as const

export const REVALIDATE_TIME = {
  POSTS: 60 * 60, // 1 hour
  STATIC_CONTENT: 60 * 60 * 24, // 24 hours
} as const
