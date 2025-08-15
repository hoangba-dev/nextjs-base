import { verifyPassword } from '@/lib/password'
import { prisma } from '@/lib/prisma'

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } })
}

export async function authenticateUser(email: string, password: string) {
  const user = await getUserByEmail(email)
  if (!user || !user.password) return null

  const ok = await verifyPassword(password, user.password)
  if (!ok) return null

  return user
}
