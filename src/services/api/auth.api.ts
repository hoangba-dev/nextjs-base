import { API_ROUTES } from '@/constants/routes'
import { LoginInput, RegisterInput, AuthResponse, User } from '@/types/auth.type'
import { signIn, signOut } from 'next-auth/react'

export const authApi = {
  login: async (data: LoginInput): Promise<void> => {
    const response = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    })
    console.log('response', response)

    if (response && response?.error) {
      throw new Error('Login failed')
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
    await signOut()
  },

  me: async (): Promise<User> => {
    const response = await fetch(API_ROUTES.AUTH.ME)

    if (!response.ok) {
      throw new Error('Failed to get user info')
    }

    return response.json()
  }
}
