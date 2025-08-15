'use client'

import { useState } from 'react'
import { CreateUserInput, UpdateUserInput, User, UserFilters } from '@/types/user'
import { useUsers } from '@/hooks/use-users'
import { useUserStats } from '@/hooks/use-users'
import { PageHeader, PageHeaderActions, PageHeaderButton } from '@/components/common'
import { UserTable } from '@/components/users/user-table'
import { UserForm } from '@/components/users/user-form'
import { FilterDropdown, createStatusFilter, createDateFilter } from '@/components/common'
import { BulkActions, commonBulkActions } from '@/components/common'
import { SectionCard } from '@/components/common'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Users, Plus, BarChart3 } from 'lucide-react'

export default function UsersPage() {
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([])
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    status: [],
    role: [],
    dateRange: ''
  })

  // Fetch users and stats
  const {
    users,
    total,
    page,
    pageSize,
    totalPages,
    isLoading,
    createUser,
    updateUser,
    deleteUser,
    bulkDeleteUsers,
    isCreating,
    isUpdating,
    isDeleting,
    isBulkDeleting
  } = useUsers(filters)

  const { stats, isLoading: statsLoading } = useUserStats()

  // Handle form submissions
  const handleCreateUser = async (data: CreateUserInput) => {
    await createUser(data)
    setShowCreateForm(false)
  }

  const handleUpdateUser = async (data: UpdateUserInput) => {
    if (editingUser) {
      await updateUser(editingUser.id, data)
      setEditingUser(null)
    }
  }

  const handleDeleteUser = async (userId: string) => {
    await deleteUser(userId)
  }

  const handleBulkDeleteUsers = async (userIds: string[]) => {
    await bulkDeleteUsers(userIds)
    setSelectedUserIds([])
  }

  // Handle user selection
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUserIds(users.map((user) => user.id))
    } else {
      setSelectedUserIds([])
    }
  }

  const handleClearSelection = () => {
    setSelectedUserIds([])
  }

  // Filter configurations
  const filterConfigs = [
    createStatusFilter(['active', 'inactive', 'pending', 'suspended'], 'Status'),
    {
      key: 'role',
      label: 'Role',
      options: [
        { value: 'user', label: 'User' },
        { value: 'admin', label: 'Admin' },
        { value: 'super_admin', label: 'Super Admin' },
        { value: 'moderator', label: 'Moderator' }
      ],
      multiple: true
    },
    createDateFilter('Date Range')
  ]

  // Bulk actions
  const bulkActions = [commonBulkActions.delete, commonBulkActions.archive]

  return (
    <div className='space-y-6'>
      {/* Page Header */}
      <PageHeader title='User Management' description='Manage your system users, roles, and permissions'>
        <PageHeaderActions>
          <FilterDropdown
            filters={filterConfigs}
            selectedFilters={filters}
            onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
            onClearFilters={() => setFilters({ search: '', status: [], role: [], dateRange: '' })}
          />
          <PageHeaderButton onClick={() => setShowCreateForm(true)}>
            <Plus className='mr-2 h-4 w-4' />
            Add User
          </PageHeaderButton>
        </PageHeaderActions>
      </PageHeader>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
        <SectionCard title='Total Users' variant='outlined'>
          <div className='flex items-center space-x-2'>
            <Users className='h-8 w-8 text-blue-600' />
            <div>
              <div className='text-2xl font-bold'>{stats?.total || 0}</div>
              <div className='text-sm text-muted-foreground'>All time</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title='Active Users' variant='outlined'>
          <div className='flex items-center space-x-2'>
            <BarChart3 className='h-8 w-8 text-green-600' />
            <div>
              <div className='text-2xl font-bold'>{stats?.active || 0}</div>
              <div className='text-sm text-muted-foreground'>{stats?.activePercentage || 0}% of total</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title='Pending Users' variant='outlined'>
          <div className='flex items-center space-x-2'>
            <BarChart3 className='h-8 w-8 text-yellow-600' />
            <div>
              <div className='text-2xl font-bold'>{stats?.pending || 0}</div>
              <div className='text-sm text-muted-foreground'>Awaiting approval</div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title='Inactive Users' variant='outlined'>
          <div className='flex items-center space-x-2'>
            <BarChart3 className='h-8 w-8 text-gray-600' />
            <div>
              <div className='text-2xl font-bold'>{stats?.inactive || 0}</div>
              <div className='text-sm text-muted-foreground'>Suspended/Inactive</div>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Bulk Actions */}
      <BulkActions
        selectedIds={selectedUserIds}
        totalItems={users.length}
        actions={bulkActions}
        onSelectAll={handleSelectAll}
        onClearSelection={handleClearSelection}
      />

      {/* Users Table */}
      <SectionCard title={`Users (${total})`} variant='default'>
        <UserTable users={users} onEdit={setEditingUser} onDelete={handleDeleteUser} isLoading={isLoading} />
      </SectionCard>

      {/* Create User Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <UserForm
            mode='create'
            onSubmit={(data: CreateUserInput) => handleCreateUser(data)}
            onCancel={() => setShowCreateForm(false)}
            isLoading={isCreating}
          />
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={!!editingUser} onOpenChange={(open) => !open && setEditingUser(null)}>
        <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <UserForm
              user={editingUser}
              mode='edit'
              onSubmit={(data: UpdateUserInput) => handleUpdateUser(data)}
              onCancel={() => setEditingUser(null)}
              isLoading={isUpdating}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
