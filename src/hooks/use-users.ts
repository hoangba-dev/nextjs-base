import { useState, useCallback } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { userApi } from '@/lib/user-api'
import { User, CreateUserInput, UpdateUserInput, UserFilters } from '@/types/user'
import { QUERY_KEYS } from '@/constants/api'
import { toast } from 'sonner'

export function useUsers(filters: UserFilters = {}, page = 1, pageSize = 10) {
  const queryClient = useQueryClient()

  const {
    data: userList,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: [...QUERY_KEYS.USERS.LIST, filters, page, pageSize],
    queryFn: () => userApi.getUsers({ page, pageSize, filters }),
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  const createUserMutation = useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST })
      toast.success('User created successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create user')
    }
  })

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserInput }) => userApi.updateUser(id, data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST })
      queryClient.setQueryData([...QUERY_KEYS.USERS.DETAIL(updatedUser.id)], updatedUser)
      toast.success('User updated successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update user')
    }
  })

  const deleteUserMutation = useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST })
      toast.success('User deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete user')
    }
  })

  const bulkDeleteUsersMutation = useMutation({
    mutationFn: userApi.bulkDeleteUsers,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST })
      toast.success('Users deleted successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete users')
    }
  })

  const createUser = useCallback((data: CreateUserInput) => createUserMutation.mutateAsync(data), [createUserMutation])

  const updateUser = useCallback(
    (id: string, data: UpdateUserInput) => updateUserMutation.mutateAsync({ id, data }),
    [updateUserMutation]
  )

  const deleteUser = useCallback((id: string) => deleteUserMutation.mutateAsync(id), [deleteUserMutation])

  const bulkDeleteUsers = useCallback(
    (ids: string[]) => bulkDeleteUsersMutation.mutateAsync(ids),
    [bulkDeleteUsersMutation]
  )

  return {
    // Data
    users: userList?.users || [],
    total: userList?.total || 0,
    page: userList?.page || 1,
    pageSize: userList?.pageSize || 10,
    totalPages: userList?.totalPages || 0,

    // State
    isLoading,
    error,

    // Actions
    createUser,
    updateUser,
    deleteUser,
    bulkDeleteUsers,
    refetch,

    // Mutation states
    isCreating: createUserMutation.isPending,
    isUpdating: updateUserMutation.isPending,
    isDeleting: deleteUserMutation.isPending,
    isBulkDeleting: bulkDeleteUsersMutation.isPending
  }
}

export function useUser(id: string) {
  const queryClient = useQueryClient()

  const {
    data: user,
    isLoading,
    error
  } = useQuery({
    queryKey: [...QUERY_KEYS.USERS.DETAIL(id)],
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  const updateUserMutation = useMutation({
    mutationFn: (data: UpdateUserInput) => userApi.updateUser(id, data),
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USERS.LIST })
      queryClient.setQueryData([...QUERY_KEYS.USERS.DETAIL(id)], updatedUser)
      toast.success('User updated successfully')
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update user')
    }
  })

  const updateUser = useCallback((data: UpdateUserInput) => updateUserMutation.mutateAsync(data), [updateUserMutation])

  return {
    user,
    isLoading,
    error,
    updateUser,
    isUpdating: updateUserMutation.isPending
  }
}

export function useUserStats() {
  const {
    data: stats,
    isLoading,
    error
  } = useQuery({
    queryKey: [...QUERY_KEYS.USERS.STATS],
    queryFn: userApi.getUserStats,
    staleTime: 1000 * 60 * 5 // 5 minutes
  })

  return {
    stats,
    isLoading,
    error
  }
}
