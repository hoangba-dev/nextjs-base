import NextAuth, { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    user?: DefaultSession['user'] & {
      id: string
      role?: string
      permissions?: string[]
    }
  }

  interface User extends DefaultUser {
    id: string
    role?: string
    permissions?: string[]
  }
}
