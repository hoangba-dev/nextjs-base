import { API_ROUTES } from '@/constants/api'
import { LoginInput, RegisterInput, AuthResponse, User } from '@/types/auth'
import { signIn } from '../../../auth'

export const authApi = {
  login: async (data: LoginInput): Promise<AuthResponse> => {
    const user = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password
    })
    if (!user || !user.ok) {
      throw new Error(user?.error || 'Login failed')
    }
    return {
      user: user.user,
      token: user.token
    }
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
