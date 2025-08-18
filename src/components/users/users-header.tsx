'use client'

import React, { useState } from 'react'
import {
  createDateFilter,
  createStatusFilter,
  FilterDropdown,
  PageHeader,
  PageHeaderActions,
  PageHeaderButton
} from '../common'
import { PlusIcon } from 'lucide-react'
import { CreateUserInput, UserFilters } from '@/types/user.type'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { UsersForm } from './users-form'

export function UsersHeader() {
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false)

  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    status: [],
    role: [],
    dateRange: ''
  })

  const handleCreateUser = async (data: CreateUserInput) => {
    setShowCreateForm(false)
  }

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

  return (
    <>
      <PageHeader title='User Management' description='Manage your system users, roles, and permissions'>
        <PageHeaderActions>
          <FilterDropdown
            filters={filterConfigs}
            selectedFilters={filters}
            onFilterChange={(key, value) => setFilters((prev) => ({ ...prev, [key]: value }))}
            onClearFilters={() => setFilters({ search: '', status: [], role: [], dateRange: '' })}
          />
          <PageHeaderButton onClick={() => setShowCreateForm(true)}>
            <PlusIcon className='mr-2 h-4 w-4' />
            Add User
          </PageHeaderButton>
        </PageHeaderActions>
      </PageHeader>
      {/* Create User Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className='max-w-4xl max-h-[90vh] overflow-y-auto'>
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>
          <UsersForm
            mode='create'
            onSubmit={(data: CreateUserInput) => handleCreateUser(data)}
            onCancel={() => setShowCreateForm(false)}
            isLoading={false}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
