'use client'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'
import { useRouter } from 'next/navigation'
import { APP_ROUTES } from '@/constants/routes'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { getSession } from 'next-auth/react'
import { useAppStore } from '@/stores/app-store'

export const useLoginMutation = () => {
  const t = useTranslations('messages')
  const router = useRouter()
  const setUser = useAppStore((state) => state.setUser)

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async () => {
      const session = await getSession()
      setUser(session?.user ?? null)
      router.push(APP_ROUTES.DASHBOARD)
      toast.success(t('login-success'))
    }
  })
}
