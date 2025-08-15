import { User, CreateUserInput, UpdateUserInput, UserListResponse, UserFilters } from '@/types/user'

// Mock data for development - replace with real API calls
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'admin',
    status: 'active',
    phone: '+1234567890',
    company: 'Tech Corp',
    position: 'Senior Developer',
    avatar: '',
    lastLoginAt: '2024-01-15T10:30:00Z',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    role: 'user',
    status: 'active',
    phone: '+1234567891',
    company: 'Design Studio',
    position: 'UI/UX Designer',
    avatar: '',
    lastLoginAt: '2024-01-14T15:45:00Z',
    createdAt: '2024-01-02T00:00:00Z',
    updatedAt: '2024-01-14T15:45:00Z'
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'moderator',
    status: 'pending',
    phone: '+1234567892',
    company: 'Marketing Agency',
    position: 'Marketing Manager',
    avatar: '',
    lastLoginAt: undefined,
    createdAt: '2024-01-10T00:00:00Z',
    updatedAt: '2024-01-10T00:00:00Z'
  },
  {
    id: '4',
    name: 'Alice Brown',
    email: 'alice@example.com',
    role: 'user',
    status: 'inactive',
    phone: '+1234567893',
    company: 'Consulting Firm',
    position: 'Business Analyst',
    avatar: '',
    lastLoginAt: '2024-01-05T09:15:00Z',
    createdAt: '2023-12-15T00:00:00Z',
    updatedAt: '2024-01-05T09:15:00Z'
  },
  {
    id: '5',
    name: 'Charlie Wilson',
    email: 'charlie@example.com',
    role: 'super_admin',
    status: 'active',
    phone: '+1234567894',
    company: 'Enterprise Inc',
    position: 'CTO',
    avatar: '',
    lastLoginAt: '2024-01-15T08:00:00Z',
    createdAt: '2023-11-01T00:00:00Z',
    updatedAt: '2024-01-15T08:00:00Z'
  }
]

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const userApi = {
  // Get users with pagination and filters
  getUsers: async (params: { page?: number; pageSize?: number; filters?: UserFilters }): Promise<UserListResponse> => {
    await delay(800) // Simulate API delay

    const { page = 1, pageSize = 10, filters = {} } = params

    let filteredUsers = [...mockUsers]

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower) ||
          user.company?.toLowerCase().includes(searchLower)
      )
    }

    // Apply status filter
    if (filters.status && filters.status.length > 0) {
      filteredUsers = filteredUsers.filter((user) => filters.status!.includes(user.status))
    }

    // Apply role filter
    if (filters.role && filters.role.length > 0) {
      filteredUsers = filteredUsers.filter((user) => filters.role!.includes(user.role))
    }

    // Apply date range filter (simplified)
    if (filters.dateRange) {
      const now = new Date()
      const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)

      switch (filters.dateRange) {
        case 'last7days':
          filteredUsers = filteredUsers.filter(
            (user) => new Date(user.createdAt) >= new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
          )
          break
        case 'last30days':
          filteredUsers = filteredUsers.filter((user) => new Date(user.createdAt) >= thirtyDaysAgo)
          break
        case 'thisMonth':
          const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1)
          filteredUsers = filteredUsers.filter((user) => new Date(user.createdAt) >= thisMonth)
          break
      }
    }

    const total = filteredUsers.length
    const totalPages = Math.ceil(total / pageSize)
    const startIndex = (page - 1) * pageSize
    const endIndex = startIndex + pageSize
    const paginatedUsers = filteredUsers.slice(startIndex, endIndex)

    return {
      users: paginatedUsers,
      total,
      page,
      pageSize,
      totalPages
    }
  },

  // Get single user by ID
  getUser: async (id: string): Promise<User> => {
    await delay(500)
    const user = mockUsers.find((u) => u.id === id)
    if (!user) {
      throw new Error('User not found')
    }
    return user
  },

  // Create new user
  createUser: async (data: CreateUserInput): Promise<User> => {
    await delay(1000)

    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      ...data,
      avatar: '',
      lastLoginAt: undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    mockUsers.push(newUser)
    return newUser
  },

  // Update existing user
  updateUser: async (id: string, data: UpdateUserInput): Promise<User> => {
    await delay(1000)

    const userIndex = mockUsers.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    const updatedUser = {
      ...mockUsers[userIndex],
      ...data,
      updatedAt: new Date().toISOString()
    }

    mockUsers[userIndex] = updatedUser
    return updatedUser
  },

  // Delete user
  deleteUser: async (id: string): Promise<void> => {
    await delay(800)

    const userIndex = mockUsers.findIndex((u) => u.id === id)
    if (userIndex === -1) {
      throw new Error('User not found')
    }

    mockUsers.splice(userIndex, 1)
  },

  // Bulk delete users
  bulkDeleteUsers: async (ids: string[]): Promise<void> => {
    await delay(1000)

    ids.forEach((id) => {
      const userIndex = mockUsers.findIndex((u) => u.id === id)
      if (userIndex !== -1) {
        mockUsers.splice(userIndex, 1)
      }
    })
  },

  // Get user statistics
  getUserStats: async () => {
    await delay(500)

    const total = mockUsers.length
    const active = mockUsers.filter((u) => u.status === 'active').length
    const pending = mockUsers.filter((u) => u.status === 'pending').length
    const inactive = mockUsers.filter((u) => u.status === 'inactive').length

    return {
      total,
      active,
      pending,
      inactive,
      activePercentage: Math.round((active / total) * 100)
    }
  }
}
