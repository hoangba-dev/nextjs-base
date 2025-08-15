'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/auth'
import { QUERY_KEYS } from '@/constants/query-keys'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/constants/routes'

export const useLoginMutation = () => {
  const queryClient = useQueryClient()
  const router = useRouter()
  return useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.AUTH.ME, data.user)
      router.push(APP_ROUTES.DASHBOARD)
    }
  })
}
