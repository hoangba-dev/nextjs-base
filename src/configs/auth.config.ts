import { APP_ROUTES } from '@/constants/api'
import { authenticateUser } from '@/services/user'
import { loginSchema } from '@/types/auth'
import { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { ZodError } from 'zod'

export default {
  providers: [
    Credentials({
      type: 'credentials',
      credentials: {
        email: {},
        password: {}
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await loginSchema.parseAsync(credentials)
          const user = await authenticateUser(email, password)
          if (!user) return null
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: user.role,
            permissions: user.permissions
          }
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
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string
        // @ts-expect-error role exists via module augmentation
        token.role = user.role ?? null
        // @ts-expect-error permissions exists via module augmentation
        token.permissions = user.permissions ?? []
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        console.log('session user')
        // session.user.id = token.id as string
        // // @ts-expect-error augmented
        // session.user.role = (token.role as string | null) ?? null
        // // @ts-expect-error augmented
        // session.user.permissions = (token.permissions as string[] | null) ?? []
      }
      return session
    }
  },
  cookies: {},
  secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig
