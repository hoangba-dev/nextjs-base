'use client'

import { createContext, useContext } from 'react'
import { User } from '@/types/auth.type'
import { useMeQuery } from '@/services/queries'
import { useLoginMutation, useLogoutMutation } from '@/services/mutations'

interface AuthContextType {
  user: User | null
  isLoading?: boolean
  isAuthenticated?: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useMeQuery()
  const { mutateAsync: loginMutation } = useLoginMutation()
  const { mutateAsync: logoutMutation } = useLogoutMutation()

  const login = async (email: string, password: string) => {
    await loginMutation({ email, password }, {})
  }

  const logout = async () => {
    await logoutMutation()
  }

  const value: AuthContextType = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
