'use client'

import { useState, useMemo } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { UpdateUserInput, User } from '@/types/user.type'
import { BulkActions, commonBulkActions, DataTable, SectionCard } from '@/components/common'
import { StatusBadge } from '@/components/common'
import { EditButton, DeleteButton } from '@/components/common'
import { ConfirmDialog } from '@/components/common'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'
import { User as UserIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { UsersForm } from './users-form'
import { useTranslations } from 'next-intl'

interface UsersTableProps {
  isLoading?: boolean
}

export function UsersTable({ isLoading }: UsersTableProps) {
  const t = useTranslations('users')
  const [userToDelete, setUserToDelete] = useState<User | null>(null)
  const [editingUser, setEditingUser] = useState<User | null>(null)

  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])

  const handleUpdateUser = async (data: UpdateUserInput) => {
    if (editingUser) {
      setEditingUser(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {}

  // Handle user selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      // setSelectedUserIds(users.map((user) => user.id))
    } else {
      setSelectedUserIds([])
    }
  }

  const handleClearSelection = () => {
    setSelectedUserIds([])
  }

  // Bulk actions
  const bulkActions = [commonBulkActions.delete, commonBulkActions.archive]

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
              <EditButton onClick={() => handleUpdateUser(user)} size='sm' />
              <DeleteButton onClick={() => setUserToDelete(user)} size='sm' />
            </div>
          )
        }
      }
    ],
    []
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
      <BulkActions
        selectedIds={selectedUserIds}
        totalItems={0}
        actions={bulkActions}
        onSelectAll={handleSelectAll}
        onClearSelection={handleClearSelection}
      />
      <SectionCard title={`Users (${0})`} variant='default'>
        <DataTable
          columns={columns}
          data={[]}
          searchKey='name'
          searchPlaceholder='Search users...'
          showColumnToggle
          showSearch
          showPagination
          pageSize={10}
        />
      </SectionCard>

      {/* Delete confirmation dialog */}
      <ConfirmDialog
        title='Delete User'
        description={`Are you sure you want to delete "${userToDelete?.name}"? This action cannot be undone.`}
        confirmText='Delete'
        variant='destructive'
        onConfirm={() => handleDeleteUser(userToDelete?.id ?? '')}
        onCancel={() => setUserToDelete(null)}
        open={!!userToDelete}
        onOpenChange={(open: boolean) => !open && setUserToDelete(null)}
      />

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <UsersForm
              user={editingUser}
              mode='edit'
              onSubmit={(data: UpdateUserInput) => handleUpdateUser(data)}
              onCancel={() => setEditingUser(null)}
              isLoading={false}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
