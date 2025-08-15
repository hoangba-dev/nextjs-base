import { loginSchema } from '@/types/auth.type'
import { NextAuthConfig } from 'next-auth'
import { ZodError } from 'zod'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { getUser } from '@/actions/users'

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

          const hashPassword = await bcrypt.hash(password, 10)

          const user = await getUser(email, hashPassword)
          if (!user) return null
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            permissions: user.permissions
          }
        } catch (err) {
          if (err instanceof ZodError) return null
          return null
        }
      }
    })
  ]
  // session: {
  //   strategy: 'jwt'
  // },
  // pages: {
  //   signIn: APP_ROUTES.LOGIN
  // },
  // callbacks: {
  //   async jwt({ token, user }) {
  //     if (user) {
  //       token.id = user.id as string
  //       // @ts-expect-error role exists via module augmentation
  //       token.role = user.role ?? null
  //       // @ts-expect-error permissions exists via module augmentation
  //       token.permissions = user.permissions ?? []
  //     }
  //     return token
  //   },
  //   async session({ session, token }) {
  //     if (session.user) {
  //       console.log('session user')
  //       // session.user.id = token.id as string
  //       // // @ts-expect-error augmented
  //       // session.user.role = (token.role as string | null) ?? null
  //       // // @ts-expect-error augmented
  //       // session.user.permissions = (token.permissions as string[] | null) ?? []
  //     }
  //     return session
  //   }
  // },
  // cookies: {},
  // secret: process.env.AUTH_SECRET
} satisfies NextAuthConfig
