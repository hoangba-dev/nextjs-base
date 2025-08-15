import { LoginInput, RegisterInput, AuthResponse, User } from '@/types/auth'
import { API_ROUTES } from '@/constants/api'

export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const response = await fetch(API_ROUTES.AUTH.LOGIN, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Login failed')
    }

    return response.json()
  },

  register: async (data: RegisterInput): Promise<AuthResponse> => {
    const response = await fetch(API_ROUTES.AUTH.REGISTER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Registration failed')
    }

    return response.json()
  },

  logout: async (): Promise<void> => {
    await fetch(API_ROUTES.AUTH.LOGOUT, { method: 'POST' })
  },

  me: async (): Promise<User> => {
    const response = await fetch(API_ROUTES.AUTH.ME)

    if (!response.ok) {
      throw new Error('Failed to get user info')
    }

    return response.json()
  }
}

export const dashboardApi = {
  getStats: async () => {
    const response = await fetch(API_ROUTES.DASHBOARD.STATS)

    if (!response.ok) {
      throw new Error('Failed to get dashboard stats')
    }

    return response.json()
  },

  getOverview: async () => {
    const response = await fetch(API_ROUTES.DASHBOARD.OVERVIEW)

    if (!response.ok) {
      throw new Error('Failed to get dashboard overview')
    }

    return response.json()
  }
}
