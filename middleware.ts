import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value
  const { pathname } = request.nextUrl
  console.log(request.nextUrl.pathname)
  // Define auth pages and protected routes
  const isAuthPage = ['/login', '/signup'].includes(pathname)
  const isPublicRoute = ['/login', '/signup', '/'].includes(pathname)

  // If user has token and tries to access auth pages, redirect to home
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If user doesn't have token and tries to access protected routes
  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

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
