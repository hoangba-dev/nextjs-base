'use client'

import { useState, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { User } from '@/types/user.type'
import { DataTable } from '@/components/common'
import { StatusBadge } from '@/components/common'
import { EditButton, DeleteButton } from '@/components/common'
import { ConfirmDialog } from '@/components/common'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { MoreHorizontal, User as UserIcon } from 'lucide-react'

interface UserTableProps {
  users: User[]
  onEdit: (user: User) => void
  onDelete: (userId: string) => void
  isLoading?: boolean
}

export function UserTable({ users, onEdit, onDelete, isLoading }: UserTableProps) {
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const handleDelete = (userId: string) => {
    onDelete(userId)
    setUserToDelete(null)
  }

  const columns: ColumnDef<User>[] = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'User',
        cell: ({ row }) => {
          const user = row.original
          return (
            <div className='flex items-center space-x-3'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  <UserIcon className='h-4 w-4' />
                </AvatarFallback>
              </Avatar>
              <div>
                <div className='font-medium'>{user.name}</div>
                <div className='text-sm text-muted-foreground'>{user.email}</div>
              </div>
            </div>
          )
        }
      },
      {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ row }) => {
          const role = row.getValue('role') as string
          const roleColors = {
            super_admin: 'bg-red-100 text-red-800 border-red-200',
            admin: 'bg-blue-100 text-blue-800 border-blue-200',
            moderator: 'bg-purple-100 text-purple-800 border-purple-200',
            user: 'bg-gray-100 text-gray-800 border-gray-200'
          }

          return (
            <Badge variant='outline' className={`capitalize ${roleColors[role as keyof typeof roleColors] || ''}`}>
              {role.replace('_', ' ')}
            </Badge>
          )
        }
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const status = row.getValue('status') as string
          return <StatusBadge status={status} />
        }
      },
      {
        accessorKey: 'company',
        header: 'Company',
        cell: ({ row }) => {
          const company = row.getValue('company') as string
          return company || <span className='text-muted-foreground'>-</span>
        }
      },
      {
        accessorKey: 'lastLoginAt',
        header: 'Last Login',
        cell: ({ row }) => {
          const lastLoginAt = row.getValue('lastLoginAt') as string
          if (!lastLoginAt) {
            return <span className='text-muted-foreground'>Never</span>
          }
          return formatDistanceToNow(new Date(lastLoginAt), { addSuffix: true })
        }
      },
      {
        accessorKey: 'createdAt',
        header: 'Created',
        cell: ({ row }) => {
          const createdAt = row.getValue('createdAt') as string
          return formatDistanceToNow(new Date(createdAt), { addSuffix: true })
        }
      },
      {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => {
          const user = row.original
          return (
            <div className='flex items-center space-x-2'>
              <EditButton onClick={() => onEdit(user)} size='sm' />
              <DeleteButton onClick={() => setUserToDelete(user)} size='sm' />
            </div>
          )
        }
      }
    ],
    [onEdit]
  )

  if (isLoading) {
    return (
      <div className='space-y-4'>
        <div className='h-8 bg-muted animate-pulse rounded' />
        <div className='space-y-2'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='h-16 bg-muted animate-pulse rounded' />
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={users}
        searchKey='name'
        searchPlaceholder='Search users...'
        showColumnToggle
        showSearch
        showPagination
        pageSize={10}
      />

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        title='Delete User'
        description={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText='Delete'
        variant='destructive'
        onConfirm={() => handleDelete(userToDelete?.id ?? '')}
        onCancel={() => setUserToDelete(null)}
        open={!!userToDelete}
        onOpenChange={(open: boolean) => !open && setUserToDelete(null)}
      />
    </>
  )
}
