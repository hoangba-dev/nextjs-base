import { UsersTable } from '@/components/users/users-table'
import { UsersHeader } from '@/components/users'
import { UsersStat } from '@/components/users/users-stat'

export default function UsersPage() {
  return (
    <div className='space-y-6'>
      <UsersHeader />
      <UsersStat />
      <UsersTable />
    </div>
  )
}
