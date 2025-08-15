import { z } from 'zod'

export const USER_STATUSES = ['active', 'inactive', 'pending', 'suspended'] as const
export type UserStatus = (typeof USER_STATUSES)[number]

export const USER_ROLES = ['user', 'admin', 'super_admin', 'moderator'] as const
export type UserRole = (typeof USER_ROLES)[number]

export const createUserSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email address'),
  role: z.enum(USER_ROLES, { message: 'Please select a role' }),
  status: z.enum(USER_STATUSES, { message: 'Please select a status' }),
  phone: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional()
})

export const updateUserSchema = createUserSchema.partial().extend({
  id: z.string().min(1, 'User ID is required')
})

export const userFiltersSchema = z.object({
  search: z.string().optional(),
  status: z.array(z.enum(USER_STATUSES)).optional(),
  role: z.array(z.enum(USER_ROLES)).optional(),
  dateRange: z.string().optional()
})

// Types
export type CreateUserInput = z.infer<typeof createUserSchema>
export type UpdateUserInput = z.infer<typeof updateUserSchema>
export type UserFilters = z.infer<typeof userFiltersSchema>

// User interface
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  permissions?: string[]
  phone?: string
  company?: string
  position?: string
  avatar?: string
  lastLoginAt?: string
  createdAt?: string
  updatedAt?: string
}

// User list response with pagination
export interface UserListResponse {
  users: User[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// User filters state
export interface UserFiltersState {
  search: string
  status: UserStatus[]
  role: UserRole[]
  dateRange: string
}

// User table column definition
export interface UserTableColumn {
  key: keyof User
  label: string
  sortable?: boolean
  filterable?: boolean
  width?: string
  render?: (value: unknown, user: User) => React.ReactNode
}
