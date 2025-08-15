import { DashboardStats } from '@/components/dashboard/dashboard-stats'

export default function DashboardPage() {
  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold tracking-tight'>Dashboard</h1>
        <p className='text-muted-foreground'>Welcome to your admin dashboard</p>
      </div>
      <DashboardStats />
    </div>
  )
}
