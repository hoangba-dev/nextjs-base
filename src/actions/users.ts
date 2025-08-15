'use server'
import { prisma } from '@/lib/prisma'
import { User, UserRole, UserStatus } from '@/types/user.type'
import bcrypt from 'bcryptjs'

export const getUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) return null

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return null

    return {
      id: user.id,
      name: user.name ?? '',
      email: user.email,
      role: user.role as UserRole,
      permissions: user.permissions,
      status: user.status as UserStatus
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}
