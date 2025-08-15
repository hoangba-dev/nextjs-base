'use client'

import { createContext, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@/types/auth'
import { useRouter } from 'next/navigation'
import { authApi } from '@/lib/api'
import { QUERY_KEYS, APP_ROUTES } from '@/constants/api'

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  register: (name: string, email: string, password: string, confirmPassword: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const queryClient = useQueryClient()

  // Get current user
  const {
    data: user,
    isLoading,
    error
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: authApi.me,
    retry: false,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.AUTH.ME, data.user)
      router.push(APP_ROUTES.DASHBOARD)
    }
  })

  // Register mutation
  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.AUTH.ME, data.user)
      router.push(APP_ROUTES.DASHBOARD)
    }
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear()
      router.push(APP_ROUTES.LOGIN)
    }
  })

  const login = async (email: string, password: string) => {
    await loginMutation.mutateAsync({ email, password })
  }

  const logout = async () => {
    await logoutMutation.mutateAsync()
  }

  const register = async (name: string, email: string, password: string, confirmPassword: string) => {
    await registerMutation.mutateAsync({ name, email, password, confirmPassword })
  }
  const value: AuthContextType = {
    user: user || null,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    register
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
