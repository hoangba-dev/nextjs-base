'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/auth'
import { APP_ROUTES } from '@/constants/routes'
import { useRouter } from 'next/navigation'

export const useLogoutMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear()
      router.push(APP_ROUTES.LOGIN)
    }
  })
}
