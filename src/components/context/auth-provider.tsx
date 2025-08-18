'use client'

import { createContext, useContext } from 'react'
import { User } from '@/types/auth.type'
import { useLoginMutation, useLogoutMutation } from '@/services/mutations'
import { useAppStore } from '@/stores/app-store'

interface AuthContextType {
  user: User | null
  isLoading?: boolean
  isAuthenticated?: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { mutateAsync: loginMutation } = useLoginMutation()
  const { mutateAsync: logoutMutation } = useLogoutMutation()

  const user = useAppStore((state) => state.user)
  console.log('user', user)

  const login = async (email: string, password: string) => {
    await loginMutation({ email, password })
  }

  const logout = async () => {
    await logoutMutation()
  }

  const value: AuthContextType = {
    user: null,
    isLoading: false,
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
