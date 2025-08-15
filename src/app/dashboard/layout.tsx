'use client'

import { DashboardHeader, DashboardSidebar } from '@/components/dashboard'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-background'>
      <DashboardSidebar />
      <div className='lg:pl-72'>
        <DashboardHeader />
        <main className='py-10'>
          <div className='px-4 sm:px-6 lg:px-8'>{children}</div>
        </main>
      </div>
    </div>
  )
}
