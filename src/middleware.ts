import authConfig from '@/configs/auth.config'
import { decrypt } from '@/lib/session'
import NextAuth from 'next-auth'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { APP_ROUTE_GROUPS, APP_ROUTES } from './constants/routes'

const protectedRoutes = [...APP_ROUTE_GROUPS.PROTECTED] as string[]
const publicRoutes = [...APP_ROUTE_GROUPS.PUBLIC] as string[]

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req: NextRequest) {
  console.log('req', req)
  const path = req.nextUrl.pathname
  console.log('path', path)
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route))

  console.log({ isProtectedRoute, isPublicRoute })

  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, req.url))
  }

  if (isPublicRoute && session?.userId && !path.startsWith(APP_ROUTES.DASHBOARD)) {
    return NextResponse.redirect(new URL(APP_ROUTES.DASHBOARD, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
