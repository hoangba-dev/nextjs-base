import authConfig from '@/configs/auth.config'
import { APP_ROUTES, ROUTE_GROUPS } from '@/constants/api'
import { decrypt } from '@/lib/session'
import NextAuth from 'next-auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const protectedRoutes = [...ROUTE_GROUPS.PROTECTED] as string[]
const publicRoutes = [...ROUTE_GROUPS.PUBLIC] as string[]

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.includes(path)
  const isPublicRoute = publicRoutes.includes(path)

  // const isLogin = !!req.auth

  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  // 4. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, req.nextUrl))
  }

  // 5. Redirect to /dashboard if the user is authenticated
  if (isPublicRoute && session?.userId && !req.nextUrl.pathname.startsWith(APP_ROUTES.DASHBOARD)) {
    return NextResponse.redirect(new URL(APP_ROUTES.DASHBOARD, req.nextUrl))
  }

  return NextResponse.next()
})

// Routes Middleware should not run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
