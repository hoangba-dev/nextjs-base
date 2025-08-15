'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  User,
  createUserSchema,
  updateUserSchema,
  USER_STATUSES,
  USER_ROLES,
  CreateUserInput,
  UpdateUserInput,
  UserRole,
  UserStatus
} from '@/types/user'
import { FormFieldComponent } from '@/components/common'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, User as UserIcon } from 'lucide-react'

interface UserFormProps<T extends 'create' | 'edit'> {
  user?: User
  onSubmit: (data: T extends 'create' ? CreateUserInput : UpdateUserInput) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
  mode: T
}
export function UserForm<T extends 'create' | 'edit'>({ user, onSubmit, onCancel, isLoading, mode }: UserFormProps<T>) {
  const schema = mode === 'create' ? createUserSchema : updateUserSchema

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: user
      ? {
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          phone: user.phone || '',
          company: user.company || '',
          position: user.position || ''
        }
      : {
          name: '',
          email: '',
          role: 'user',
          status: 'pending',
          phone: '',
          company: '',
          position: ''
        }
  })

  const handleSubmit = async (data: any) => {
    try {
      await onSubmit(data)
      form.reset()
    } catch (error) {
      console.error('Form submission error:', error)
    }
  }

  return (
    <Card className='w-full max-w-2xl mx-auto'>
      <CardHeader>
        <div className='flex items-center space-x-2'>
          <UserIcon className='h-5 w-5' />
          <div>
            <CardTitle>{mode === 'create' ? 'Create New User' : 'Edit User'}</CardTitle>
            <CardDescription>
              {mode === 'create' ? 'Add a new user to your system' : `Update ${user?.name}'s information`}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Name */}
            <FormFieldComponent name='name' label='Full Name' required error={form.formState.errors.name?.message}>
              <Input
                placeholder='Enter full name'
                {...form.register('name')}
                className={form.formState.errors.name ? 'border-destructive' : ''}
              />
            </FormFieldComponent>

            {/* Email */}
            <FormFieldComponent
              name='email'
              label='Email Address'
              required
              error={form.formState.errors.email?.message}
            >
              <Input
                type='email'
                placeholder='Enter email address'
                {...form.register('email')}
                className={form.formState.errors.email ? 'border-destructive' : ''}
              />
            </FormFieldComponent>

            {/* Role */}
            <FormFieldComponent name='role' label='User Role' required error={form.formState.errors.role?.message}>
              <Select value={form.watch('role')} onValueChange={(value) => form.setValue('role', value as UserRole)}>
                <SelectTrigger className={form.formState.errors.role ? 'border-destructive' : ''}>
                  <SelectValue placeholder='Select a role' />
                </SelectTrigger>
                <SelectContent>
                  {USER_ROLES.map((role) => (
                    <SelectItem key={role} value={role}>
                      {role.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormFieldComponent>

            {/* Status */}
            <FormFieldComponent
              name='status'
              label='User Status'
              required
              error={form.formState.errors.status?.message}
            >
              <Select
                value={form.watch('status')}
                onValueChange={(value) => form.setValue('status', value as UserStatus)}
              >
                <SelectTrigger className={form.formState.errors.status ? 'border-destructive' : ''}>
                  <SelectValue placeholder='Select a status' />
                </SelectTrigger>
                <SelectContent>
                  {USER_STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormFieldComponent>

            {/* Phone */}
            <FormFieldComponent name='phone' label='Phone Number' error={form.formState.errors.phone?.message}>
              <Input
                placeholder='Enter phone number'
                {...form.register('phone')}
                className={form.formState.errors.phone ? 'border-destructive' : ''}
              />
            </FormFieldComponent>

            {/* Company */}
            <FormFieldComponent name='company' label='Company' error={form.formState.errors.company?.message}>
              <Input
                placeholder='Enter company name'
                {...form.register('company')}
                className={form.formState.errors.company ? 'border-destructive' : ''}
              />
            </FormFieldComponent>
          </div>

          {/* Position */}
          <FormFieldComponent name='position' label='Job Position' error={form.formState.errors.position?.message}>
            <Input
              placeholder='Enter job position'
              {...form.register('position')}
              className={form.formState.errors.position ? 'border-destructive' : ''}
            />
          </FormFieldComponent>

          {/* Form Actions */}
          <div className='flex items-center justify-end space-x-3 pt-6 border-t'>
            <Button type='button' variant='outline' onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type='submit' disabled={isLoading} className='min-w-[100px]'>
              {isLoading ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  {mode === 'create' ? 'Creating...' : 'Updating...'}
                </>
              ) : mode === 'create' ? (
                'Create User'
              ) : (
                'Update User'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
