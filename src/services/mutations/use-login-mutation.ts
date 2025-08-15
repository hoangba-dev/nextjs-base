'use client'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/auth'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/constants/routes'

export const useLoginMutation = () => {
  const router = useRouter()
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: () => {
      router.push(APP_ROUTES.DASHBOARD)
    }
  })
}
