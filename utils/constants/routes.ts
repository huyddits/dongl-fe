export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  WELCOME: '/welcome',
  FORGOT_PASSWORD: '/forgot-password',
  GUEST_ORDER: '/guest-order',
  LETTER: '/letter',
} as const

export const AUTH_ROUTES = [
  ROUTES.LOGIN,
  ROUTES.SIGNUP,
  ROUTES.FORGOT_PASSWORD,
  ROUTES.WELCOME,
  ROUTES.GUEST_ORDER,
]

export const PUBLIC_ROUTES = [ROUTES.HOME, ROUTES.LETTER, ...AUTH_ROUTES]
