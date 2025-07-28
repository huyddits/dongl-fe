import { TOKEN_KEY } from '@/utils/constants/api'
import { AUTH_ROUTES, PUBLIC_ROUTES, ROUTES } from '@/utils/constants/routes'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // const cookie = await cookies()
  // const token = cookie.get(TOKEN_KEY)
  // const { pathname } = request.nextUrl

  // // Check if current path is an auth route
  // const isAuthRoute = AUTH_ROUTES.includes(pathname as any)
  // const isPublicRoute = PUBLIC_ROUTES.includes(pathname as any)

  // // If user has token and tries to access auth routes, redirect to home
  // if (token && isAuthRoute) {
  //   return NextResponse.redirect(new URL(ROUTES.HOME, request.url))
  // }

  // // If user doesn't have token and tries to access protected routes
  // if (!token && !isPublicRoute) {
  //   return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
  // }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - public folder files (images, icons, etc.)
     * - files ending with .js, .svg, .png, .jpg
     */
    '/((?!api|_next/static|_next/image|icon.ico|image|sw.js|manifest.json).*)',
  ],
}
