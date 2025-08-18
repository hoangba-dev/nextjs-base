import { loginSchema } from '@/types/auth.type'
import { NextAuthConfig } from 'next-auth'
import { ZodError } from 'zod'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { APP_ROUTES } from '@/constants/routes'

export default {
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials)

          const user = await prisma.user.findFirst({
            where: {
              email: email
            }
          })

          if (!user) return null

          const hashPassword = await bcrypt.compare(password, user?.password || '')

          if (!hashPassword) return null

          return user
        } catch (err) {
          if (err instanceof ZodError) return null
          return null
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: APP_ROUTES.LOGIN
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (account?.provider === 'credentials') {
        token.credentials = true
      }
      if (user) {
        token.id = user.id
        token.role = user.role
        token.permissions = user.permissions
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.permissions = (token.permissions as string[] | null) ?? []
      }
      return session
    }
  },
  // cookies: {},
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig
