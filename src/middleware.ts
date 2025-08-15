import authConfig from '@/configs/auth.config'
import NextAuth from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { APP_ROUTE_GROUPS, APP_ROUTES } from './constants/routes'
import { getToken } from 'next-auth/jwt'

const protectedRoutes = [...APP_ROUTE_GROUPS.PROTECTED] as string[]
const publicRoutes = [...APP_ROUTE_GROUPS.PUBLIC] as string[]

const { auth } = NextAuth(authConfig)

export default auth(async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.some((route) => path.startsWith(route))

  const token = await getToken({ req, secret: process.env.AUTH_SECRET })
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL(APP_ROUTES.LOGIN, req.url))
  }

  if (token && path === APP_ROUTES.HOME) {
    return NextResponse.next()
  }

  if (isPublicRoute && token && !path.startsWith(APP_ROUTES.DASHBOARD)) {
    return NextResponse.redirect(new URL(APP_ROUTES.DASHBOARD, req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)']
}
