'use client'
import { QUERY_KEYS } from '@/constants/query-keys'
import { useQuery } from '@tanstack/react-query'
import { authApi } from '../api/auth.api'

export const useMeQuery = () => {
  const data = useQuery({
    queryKey: QUERY_KEYS.AUTH.ME,
    queryFn: authApi.me,
    retry: false,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  return {
    user: data.data,
    isLoading: data.isLoading,
    error: data.error
  }
}
