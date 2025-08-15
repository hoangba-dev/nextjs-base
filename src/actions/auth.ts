'use server'

import { signIn } from '@/auth'

export const login = async (email: string, password: string): Promise<void> => {
  const response = await signIn('credentials', {
    values: { email, password },
    redirect: false
  })
  return response
}
