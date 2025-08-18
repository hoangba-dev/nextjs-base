'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import { APP_ROUTES } from '@/constants/routes'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'
import { useAppStore } from '@/stores/app-store'

export const useLogoutMutation = () => {
  const t = useTranslations('messages')
  const queryClient = useQueryClient()
  const router = useRouter()

  const resetAppStore = useAppStore((state) => state.reset)
  const resetStore = () => {
    resetAppStore()
  }

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear()
      router.push(APP_ROUTES.LOGIN)
      toast.success(t('logout-success'))
      resetStore()
    }
  })
}
